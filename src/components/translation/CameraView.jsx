import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";

export const CameraView = ({
  onLandmarks,
  onHandDetected,
}) => {
  const videoRef = useRef(null);

  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const lastDetectionTimeRef = useRef(0);

  const [cameraStatus, setCameraStatus] = useState("starting");
  const [detectorStatus, setDetectorStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      try {
        setError(null);
        setCameraStatus("starting");

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "Camera access is not available in this browser."
          );
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
            },
            audio: false,
          });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play();

          setCameraStatus("ready");

          console.log("✅ Camera started");
        }
      } catch (err) {
        console.error("❌ Camera error:", err);

        setCameraStatus("error");

        setError(
          err?.message ||
            "Unable to access the camera."
        );

        onHandDetected?.(false);
      }
    };

    startCamera();

    return () => {
      cancelled = true;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }
    };
  }, [onHandDetected]);

  useEffect(() => {
    let cancelled = false;

    const setupDetector = async () => {
      try {
        setDetectorStatus("loading");

        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
          );

        const handLandmarker =
          await HandLandmarker.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              },

              runningMode: "VIDEO",

              numHands: 1,

              minHandDetectionConfidence: 0.5,

              minHandPresenceConfidence: 0.5,

              minTrackingConfidence: 0.5,
            }
          );

        if (cancelled) {
          handLandmarker.close();
          return;
        }

        landmarkerRef.current = handLandmarker;

        setDetectorStatus("ready");

        console.log("✅ MediaPipe Hand Landmarker ready");
      } catch (err) {
        console.error(
          "❌ MediaPipe initialization error:",
          err
        );

        setDetectorStatus("error");

        setError(
          "Hand detection could not be initialized."
        );
      }
    };

    setupDetector();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const detect = () => {
      const video = videoRef.current;
      const landmarker = landmarkerRef.current;

      if (
        !video ||
        !landmarker ||
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        animationRef.current =
          requestAnimationFrame(detect);

        return;
      }

      const now = performance.now();

      /*
       * Don't run MediaPipe on every single browser frame.
       * Around 15 FPS is enough for this learning interface.
       */
      if (
        now - lastDetectionTimeRef.current <
        66
      ) {
        animationRef.current =
          requestAnimationFrame(detect);

        return;
      }

      lastDetectionTimeRef.current = now;

      try {
        const result =
          landmarker.detectForVideo(
            video,
            now
          );

        const hasHand =
          result.landmarks &&
          result.landmarks.length > 0;

        onHandDetected?.(hasHand);

        if (hasHand) {
          const landmarks =
            result.landmarks[0];

          onLandmarks?.(landmarks);
        } else {
          onLandmarks?.(null);
        }
      } catch (err) {
        console.error(
          "❌ Hand detection error:",
          err
        );
      }

      animationRef.current =
        requestAnimationFrame(detect);
    };

    animationRef.current =
      requestAnimationFrame(detect);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [onLandmarks, onHandDetected]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-950">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-[300px] w-full object-cover"
      />

      {cameraStatus === "starting" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
          <p className="text-sm text-white">
            Starting camera...
          </p>
        </div>
      )}

      {cameraStatus === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 px-6 text-center">
          <div>
            <p className="text-sm font-medium text-white">
              Camera unavailable
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              {error}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Check your browser camera permission.
            </p>
          </div>
        </div>
      )}

      {cameraStatus === "ready" &&
        detectorStatus === "loading" && (
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs text-slate-600">
            Loading hand detection...
          </div>
        )}

      {cameraStatus === "ready" &&
        detectorStatus === "ready" && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
            Camera ready
          </div>
        )}

      {detectorStatus === "error" && (
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-red-500/90 px-4 py-3 text-xs text-white">
          Hand detection failed to initialize.
        </div>
      )}

    </div>
  );
};