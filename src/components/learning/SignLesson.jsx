import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { CourseProgress } from "./CourseProgress";
import { CameraView } from "../translation/CameraView";

import { useAlphabetRecognition } from "../../hooks/useAlphabetRecognition";

const CONFIDENCE_THRESHOLD = 0.75;

export const SignLesson = ({
  sign,
  currentIndex,
  total,
  onPrevious,
  onNext,
}) => {
  const [handDetected, setHandDetected] =
    useState(false);

  const {
    modelLoaded,
    predictedLetter,
    confidence,
    error: modelError,
    predictLetter,
    resetPrediction,
  } = useAlphabetRecognition();

  const isCorrect =
    predictedLetter &&
    predictedLetter.toUpperCase() ===
      sign.letter.toUpperCase() &&
    confidence >= CONFIDENCE_THRESHOLD;

  const handleHandDetected = useCallback(
    (detected) => {
      setHandDetected(detected);

      if (!detected) {
        resetPrediction();
      }
    },
    [resetPrediction]
  );

  const handleLandmarks = useCallback(
    (landmarks) => {
      if (!landmarks) {
        return;
      }

      if (!modelLoaded) {
        return;
      }

      predictLetter(landmarks);
    },
    [modelLoaded, predictLetter]
  );

  return (
    <div className="mx-auto max-w-5xl">

      {/* TOP */}

      <div className="mb-8 flex items-center justify-between">

        <Link
          to="/learn"
          className="text-sm text-slate-500 transition hover:text-slate-950"
        >
          ← Back to learning
        </Link>

        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Alphabet practice
        </p>

      </div>


      {/* PROGRESS */}

      <CourseProgress
        current={currentIndex + 1}
        total={total}
      />


      {/* LESSON */}

      <div className="mt-10 grid overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white lg:grid-cols-2">

        {/* REFERENCE */}

        <div className="flex min-h-[560px] flex-col items-center justify-center bg-[#ebe8df] p-8">

          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Learn this sign
          </p>

          <div className="mt-8 flex h-[380px] w-full max-w-[420px] items-center justify-center">

            <img
              src={sign.image}
              alt={`Sign for ${sign.letter}`}
              className="h-full w-full object-contain"
            />

          </div>

          <div className="mt-6 flex items-end gap-3">

            <h1 className="font-serif text-7xl leading-none text-slate-950">
              {sign.letter}
            </h1>

            <span className="pb-2 text-sm text-slate-400">
              {currentIndex + 1} / {total}
            </span>

          </div>

        </div>


        {/* PRACTICE */}

        <div className="flex min-h-[560px] flex-col p-8 sm:p-10">

          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Your turn
          </p>

          <h2 className="mt-3 font-serif text-4xl text-slate-950">
            Make the sign.
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Show the same hand sign to your camera.
            We'll check it for you.
          </p>


          {/* CAMERA */}

          <div className="mt-8">

            <CameraView
              onLandmarks={handleLandmarks}
              onHandDetected={handleHandDetected}
            />

          </div>


          {/* STATUS */}

          <div
            className={`mt-5 rounded-2xl border px-5 py-4 transition-all duration-300 ${
              isCorrect
                ? "border-emerald-500/30 bg-emerald-50"
                : "border-slate-900/10 bg-[#f5f3ee]"
            }`}
          >

            {!handDetected && (
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                  ✋
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Show your hand
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Place one hand in front of the camera.
                  </p>
                </div>

              </div>
            )}


            {handDetected && !isCorrect && (
              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Detected
                </p>

                <div className="mt-2 flex items-end justify-between">

                  <p className="font-serif text-4xl text-slate-950">
                    {predictedLetter || "—"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {Math.round(
                      confidence * 100
                    )}
                    %
                  </p>

                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Target: {sign.letter}
                </p>

              </div>
            )}


            {isCorrect && (
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                  ✓
                </div>

                <div>

                  <p className="text-sm font-medium text-emerald-700">
                    Correct! You got it.
                  </p>

                  <p className="mt-1 text-xs text-emerald-600/70">
                    Confidence:{" "}
                    {Math.round(
                      confidence * 100
                    )}
                    %
                  </p>

                </div>

              </div>
            )}

          </div>


          {/* MODEL STATUS */}

          {!modelLoaded && !modelError && (
            <p className="mt-3 text-xs text-slate-400">
              Loading alphabet recognition model...
            </p>
          )}

          {modelError && (
            <p className="mt-3 text-xs text-red-500">
              {modelError}
            </p>
          )}


          {/* TARGET */}

          <div className="mt-5 rounded-xl border border-slate-900/10 px-5 py-4">

            <div className="flex items-center justify-between">

              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Target
              </span>

              <span className="font-serif text-2xl">
                {sign.letter}
              </span>

            </div>

          </div>


          {/* CONTROLS */}

          <div className="mt-auto flex items-center justify-between pt-8">

            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="
                rounded-full
                border
                border-slate-900/10
                px-5
                py-3
                text-sm
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              ← Previous
            </button>

            <button
              onClick={onNext}
              disabled={!isCorrect}
              className="
                rounded-full
                bg-slate-950
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:bg-slate-200
                disabled:text-slate-400
              "
            >
              {currentIndex === total - 1
                ? "Finish course"
                : "Next sign →"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};