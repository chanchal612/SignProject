import { useEffect, useState } from "react";

export const TranslationPanel = ({
  translation,
  recognizedGesture,
  handDetected,
  holdProgress,
  isHoldingSign,
  signCaptured,
  clearTranslation,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    setDisplayProgress(holdProgress);
  }, [holdProgress]);

  const remainingSeconds = Math.max(
    0,
    Math.ceil(5 - (holdProgress / 100) * 5)
  );

  return (
    <div className="relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white p-7 shadow-sm">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-slate-100 blur-3xl" />

      {/* HEADER */}
      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Live translation
          </p>

          <h2 className="mt-3 font-serif text-3xl text-slate-900">
            Your message
          </h2>
        </div>

        {/* Tracking status */}
        <div className="flex items-center gap-2 rounded-full border border-slate-900/10 px-3 py-1.5">

          <span
            className={`h-2 w-2 rounded-full ${
              handDetected
                ? "animate-pulse bg-emerald-400"
                : "bg-slate-300"
            }`}
          />

          <span className="text-xs text-slate-500">
            {handDetected ? "Tracking" : "Waiting"}
          </span>

        </div>

      </div>


      {/* TRANSLATION AREA */}
      <div className="relative mt-8 flex flex-1 flex-col overflow-hidden rounded-[1.5rem] bg-[#f5f5f0] p-6">

        {/* Small label */}
        <div className="flex items-center justify-between">

          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Translation
          </p>

          {translation.length > 0 && (
            <span className="text-xs text-slate-400">
              {translation.length}{" "}
              {translation.length === 1
                ? "sign"
                : "signs"}
            </span>
          )}

        </div>


        {/* MESSAGE */}
        <div className="mt-6 flex-1">

          {translation.length > 0 ? (

            <div className="flex flex-wrap gap-2">

              {translation.map((word, index) => (

                <span
                  key={`${word}-${index}`}
                  className="animate-[fadeIn_0.4s_ease-out] rounded-full bg-white px-4 py-2 font-serif text-xl text-slate-900 shadow-sm"
                >
                  {word}
                </span>

              ))}

            </div>

          ) : (

            <div className="flex h-full min-h-[120px] items-center">

              <p className="font-serif text-3xl leading-relaxed text-slate-300">
                Waiting for your signs...
              </p>

            </div>

          )}

        </div>


        {/* CURRENT SIGN CARD */}

        <div
          className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-500 ${
            signCaptured
              ? "border-emerald-200 bg-emerald-50"
              : isHoldingSign
              ? "border-slate-300 bg-white shadow-md"
              : "border-slate-900/10 bg-white"
          }`}
        >

          {/* Progress glow */}
          {isHoldingSign && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-slate-900 transition-[width] duration-100"
              style={{
                width: `${displayProgress}%`,
              }}
            />
          )}


          {/* CAPTURED STATE */}

          {signCaptured ? (

            <div className="flex items-center gap-4 animate-[fadeIn_0.3s_ease-out]">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-600">
                ✓
              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
                  Sign captured
                </p>

                <p className="mt-1 text-lg font-medium text-slate-900">
                  Added to your message
                </p>

              </div>

            </div>

          ) : (

            <>
              {/* CURRENT SIGN HEADER */}

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Current sign
                  </p>

                  <p
                    className={`mt-2 text-xl font-medium transition-all duration-300 ${
                      handDetected
                        ? "text-slate-900"
                        : "text-slate-300"
                    }`}
                  >
                    {handDetected
                      ? recognizedGesture
                      : "No sign detected"}
                  </p>

                </div>


                {/* Animated hand indicator */}

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-all duration-500 ${
                    isHoldingSign
                      ? "scale-110 bg-slate-900 text-white shadow-lg"
                      : handDetected
                      ? "bg-slate-100"
                      : "bg-slate-50 text-slate-300"
                  }`}
                >
                  {handDetected ? "✋" : "—"}
                </div>

              </div>


              {/* HOLDING SIGN */}

              {isHoldingSign && (

                <div className="mt-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-700">
                        Hold your sign
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Keep your hand steady
                      </p>

                    </div>

                    {/* Countdown */}

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10">

                      <span className="text-sm font-semibold text-slate-700">
                        {remainingSeconds}
                      </span>

                    </div>

                  </div>


                  {/* MAIN PROGRESS */}

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-slate-900 transition-[width] duration-100"
                      style={{
                        width: `${displayProgress}%`,
                      }}
                    />

                  </div>


                  {/* PROGRESS DOTS */}

                  <div className="mt-3 flex justify-between px-0.5">

                    {[0, 1, 2, 3, 4].map((dot) => (

                      <span
                        key={dot}
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          displayProgress >=
                          (dot + 1) * 20
                            ? "scale-125 bg-slate-900"
                            : "bg-slate-200"
                        }`}
                      />

                    ))}

                  </div>

                </div>

              )}


              {/* READY STATE */}

              {!isHoldingSign && handDetected && (

                <p className="mt-4 text-xs text-slate-400">
                  Keep your hand visible to translate your sign.
                </p>

              )}

            </>

          )}

        </div>


        {/* CONTROLS */}

        <div className="mt-5 flex items-center justify-between">

          <p className="text-sm text-slate-400">

            {translation.length === 0
              ? "No signs yet"
              : `${translation.length} ${
                  translation.length === 1
                    ? "sign"
                    : "signs"
                } translated`}

          </p>


          <button
            onClick={clearTranslation}
            disabled={translation.length === 0}
            className="rounded-full border border-slate-900/10 px-5 py-2 text-sm text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
          >
            Clear
          </button>

        </div>

      </div>

    </div>
  );
};