import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const useAlphabetRecognition = () => {
  const modelRef = useRef(null);

  const [modelLoaded, setModelLoaded] = useState(false);
  const [predictedLetter, setPredictedLetter] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadModel = async () => {
      try {
        setError(null);

        await tf.ready();

        /*
         * We will place the converted TensorFlow.js model here:
         *
         * public/models/asl/model.json
         *
         * Don't worry if this file doesn't exist yet.
         */
        const model = await tf.loadLayersModel(
          "/models/asl/model.json"
        );

        if (cancelled) {
          model.dispose();
          return;
        }

        modelRef.current = model;
        setModelLoaded(true);

        console.log("ASL alphabet model loaded");
      } catch (err) {
        console.error("ASL model failed to load:", err);

        if (!cancelled) {
          setError(
            "Alphabet recognition model is not available yet."
          );
        }
      }
    };

    loadModel();

    return () => {
      cancelled = true;

      if (modelRef.current) {
        modelRef.current.dispose();
        modelRef.current = null;
      }
    };
  }, []);

  const predictLetter = useCallback((landmarks) => {
    if (!modelRef.current || !landmarks) {
      return null;
    }

    try {
      /*
       * MediaPipe gives us 21 landmarks.
       *
       * Each landmark:
       * {
       *   x,
       *   y,
       *   z
       * }
       *
       * Therefore:
       * 21 × 3 = 63 features.
       */

      const input = [];

      landmarks.forEach((point) => {
        input.push(point.x);
        input.push(point.y);
        input.push(point.z);
      });

      if (input.length !== 63) {
        console.warn(
          "Expected 63 landmark values but received:",
          input.length
        );

        return null;
      }

      const tensor = tf.tensor2d(
        [input],
        [1, 63]
      );

      const prediction = modelRef.current.predict(tensor);

      const probabilities = Array.isArray(prediction)
        ? prediction[0]
        : prediction;

      const values = probabilities.dataSync();

      let highestIndex = 0;

      for (let i = 1; i < values.length; i++) {
        if (values[i] > values[highestIndex]) {
          highestIndex = i;
        }
      }

      const letter =
        LETTERS[highestIndex] ?? null;

      const score =
        values[highestIndex] ?? 0;

      setPredictedLetter(letter);
      setConfidence(score);

      tensor.dispose();

      if (Array.isArray(prediction)) {
        prediction.forEach((tensor) => tensor.dispose());
      } else {
        prediction.dispose();
      }

      return letter;
    } catch (err) {
      console.error(
        "Alphabet prediction error:",
        err
      );

      return null;
    }
  }, []);

  const resetPrediction = useCallback(() => {
    setPredictedLetter(null);
    setConfidence(0);
  }, []);

  return {
    modelLoaded,
    predictedLetter,
    confidence,
    error,
    predictLetter,
    resetPrediction,
  };
};