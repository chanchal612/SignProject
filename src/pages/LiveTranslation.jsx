import { CameraView } from "../components/CameraView";
import { TranslationPanel } from "../components/TranslationPanel";
import { useGestureRecognition } from "../hooks/useGestureRecognition";

export const LiveTranslation = () => {
  const {
    videoRef,
    canvasRef,
    cameraStatus,
    handDetected,
    recognizedGesture,
    translation,
    error,

    holdProgress,
    isHoldingSign,
    signCaptured,

    clearTranslation,
  } = useGestureRecognition();

  return (
    <div className="min-h-screen bg-[#f8f8f5]">

      {/* NAVBAR */}
      <nav className="border-b border-slate-900/10 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          <a
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              S
            </div>

            <div>
              <p className="text-sm font-semibold">
                SIGNPROJECT
              </p>

              <p className="text-[9px] tracking-[0.25em] text-slate-500">
                LIVE TRANSLATION
              </p>
            </div>
          </a>

          <a
            href="/"
            className="text-sm text-slate-600 transition hover:text-slate-950"
          >
            ← Back to Home
          </a>

        </div>

      </nav>


      {/* MAIN */}
      <main>

        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Real-time sign language
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight text-slate-900 md:text-7xl">
            Let your hands
            <span className="italic">
              {" "}speak.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-slate-600">
            Show your hand to the camera and
            SignProject will detect your gesture.
          </p>


          {/* CAMERA + TRANSLATION */}

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">

            <CameraView
              videoRef={videoRef}
              canvasRef={canvasRef}
              cameraStatus={cameraStatus}
              handDetected={handDetected}
              error={error}
            />

            <TranslationPanel
              translation={translation}
              recognizedGesture={recognizedGesture}
              handDetected={handDetected}
              holdProgress={holdProgress}
              isHoldingSign={isHoldingSign}
              signCaptured={signCaptured}
              clearTranslation={clearTranslation}
            />

          </div>

        </section>

      </main>

    </div>
  );
};