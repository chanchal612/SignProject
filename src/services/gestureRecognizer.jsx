import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm";

export const createGestureRecognizer = async () => {
  const vision =
    await FilesetResolver.forVisionTasks(WASM_URL);

  const recognizer =
    await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: MODEL_URL,
        },

        runningMode: "VIDEO",

        numHands: 2,

        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      }
    );

  return recognizer;
};