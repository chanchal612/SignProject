export const CameraView = ({
  videoRef,
  canvasRef,
  cameraStatus,
  handDetected,
  error,
}) => {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-slate-950 shadow-xl">

      <div className="relative aspect-video">

        {/* CAMERA */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />

        {/* HAND TRACKING */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* STARTING MESSAGE */}
        {cameraStatus === "starting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-center text-white">

            <div>

              <div className="text-5xl">
                📷
              </div>

              <p className="mt-4">
                Starting camera...
              </p>

            </div>

          </div>
        )}

        {/* ERROR */}
        {cameraStatus === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-center text-white">

            <div className="px-6">

              <div className="text-5xl">
                ⚠️
              </div>

              <p className="mt-4">
                Camera unavailable
              </p>

              <p className="mt-3 text-sm text-white/50">
                {error}
              </p>

            </div>

          </div>
        )}

        {/* LIVE */}
        {cameraStatus === "active" && (
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs text-white backdrop-blur-md">

            <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />

            LIVE

          </div>
        )}

      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">

        <span className="text-sm text-white/60">
          {handDetected
            ? "✋ Hand detected"
            : "Searching for hand..."}
        </span>

        <span className="text-xs text-white/40">
          AI Detection
        </span>

      </div>

    </div>
  );
};