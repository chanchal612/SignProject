import { useEffect, useRef, useState } from "react";

import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

import { SIGN_VOCABULARY } from "../data/signVocabulary";


export const useGestureRecognition = () => {

  // --------------------------------
  // REFS
  // --------------------------------

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const recognizerRef = useRef(null);
  const animationRef = useRef(null);

  const lastGestureRef = useRef("");
  const lastGestureTimeRef = useRef(0);
  const lastGestureAddedRef = useRef("");


  // --------------------------------
  // CAMERA STATE
  // --------------------------------

  const [cameraStatus, setCameraStatus] =
    useState("starting");

  const [error, setError] =
    useState("");


  // --------------------------------
  // RECOGNITION STATE
  // --------------------------------

  const [handDetected, setHandDetected] =
    useState(false);

  const [recognizedGesture, setRecognizedGesture] =
    useState("No sign detected");

  const [translation, setTranslation] =
    useState([]);


  // --------------------------------
  // HOLD / CAPTURE STATE
  // --------------------------------

  const [holdProgress, setHoldProgress] =
    useState(0);

  const [isHoldingSign, setIsHoldingSign] =
    useState(false);

  const [signCaptured, setSignCaptured] =
    useState(false);


  // ================================================
  // START CAMERA
  // ================================================

  const startCamera = async () => {

    try {

      console.log("Requesting camera...");

      if (!videoRef.current) {
        throw new Error(
          "Camera element could not be found."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 720,
            facingMode: "user",
          },
          audio: false,
        });


      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      setCameraStatus("active");

      console.log("Camera started");

    } catch (err) {

      console.error(
        "Camera error:",
        err
      );

      setError(
        err?.message ||
        "Unable to access camera."
      );

      setCameraStatus("error");
    }
  };


  // ================================================
  // LOAD GESTURE RECOGNIZER
  // ================================================

  const loadGestureRecognizer = async () => {

    try {

      console.log(
        "Loading gesture recognizer..."
      );

      const vision =
        await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"
        );


      const recognizer =
        await GestureRecognizer.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            },

            runningMode: "VIDEO",

            numHands: 1,

          }
        );


      recognizerRef.current =
        recognizer;

      console.log(
        "Gesture recognizer loaded"
      );

      return recognizer;

    } catch (err) {

      console.error(
        "Gesture recognizer error:",
        err
      );

      setError(
        "Could not load gesture recognition."
      );

      return null;
    }
  };


  // ================================================
  // DRAW HAND LANDMARKS
  // ================================================

  const drawHands = (results) => {

    const canvas =
      canvasRef.current;

    const video =
      videoRef.current;


    if (!canvas || !video) {
      return;
    }


    const ctx =
      canvas.getContext("2d");


    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;


    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    // --------------------------------
    // NO HAND
    // --------------------------------

    if (
      !results?.landmarks ||
      results.landmarks.length === 0
    ) {

      setHandDetected(false);

      setRecognizedGesture(
        "No sign detected"
      );


      // Reset current sign

      setIsHoldingSign(false);

      setHoldProgress(0);

      lastGestureRef.current = "";

      lastGestureTimeRef.current = 0;

      lastGestureAddedRef.current = "";

      return;
    }


    // --------------------------------
    // HAND FOUND
    // --------------------------------

    setHandDetected(true);


    // --------------------------------
    // DRAW LANDMARKS
    // --------------------------------

    const landmarks =
      results.landmarks[0];


    ctx.fillStyle =
      "#ffffff";

    ctx.strokeStyle =
      "#ffffff";

    ctx.lineWidth = 3;


    for (const point of landmarks) {

      const x =
        point.x * canvas.width;

      const y =
        point.y * canvas.height;


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }


    // --------------------------------
    // HAND CONNECTIONS
    // --------------------------------

    const connections = [

      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],

      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],

      [0, 9],
      [9, 10],
      [10, 11],
      [11, 12],

      [0, 13],
      [13, 14],
      [14, 15],
      [15, 16],

      [0, 17],
      [17, 18],
      [18, 19],
      [19, 20],

      [5, 9],
      [9, 13],
      [13, 17],
    ];


    for (
      const [start, end]
      of connections
    ) {

      const p1 =
        landmarks[start];

      const p2 =
        landmarks[end];


      ctx.beginPath();

      ctx.moveTo(
        p1.x * canvas.width,
        p1.y * canvas.height
      );

      ctx.lineTo(
        p2.x * canvas.width,
        p2.y * canvas.height
      );

      ctx.stroke();
    }


    // ================================================
    // GET GESTURE
    // ================================================

    const gesture =
      results.gestures?.[0]?.[0];


    if (!gesture) {

      setRecognizedGesture(
        "Unknown"
      );

      setIsHoldingSign(false);

      setHoldProgress(0);

      return;
    }


    const gestureName =
      gesture.categoryName;


    const score =
      gesture.score ?? 0;


    console.log(
      "GESTURE:",
      gestureName,
      "SCORE:",
      score
    );


    // --------------------------------
    // GET WORD
    // --------------------------------

    const word =
      SIGN_VOCABULARY[
        gestureName
      ];


    // If vocabulary doesn't contain
    // this gesture, don't add it.

    if (!word) {

      setRecognizedGesture(
        gestureName
      );

      setIsHoldingSign(false);

      setHoldProgress(0);

      return;
    }


    setRecognizedGesture(
      word
    );


    // ================================================
    // STABLE SIGN DETECTION
    // ================================================

    const now =
      performance.now();


    // --------------------------------
    // NEW SIGN
    // --------------------------------

    if (
      lastGestureRef.current !==
      gestureName
    ) {

      lastGestureRef.current =
        gestureName;


      lastGestureTimeRef.current =
        now;


      lastGestureAddedRef.current =
        "";


      setIsHoldingSign(true);

      setSignCaptured(false);

      setHoldProgress(0);

      return;
    }


    // --------------------------------
    // SAME SIGN
    // --------------------------------

    const elapsed =
      now -
      lastGestureTimeRef.current;


    // 5 SECOND PROGRESS

    const progress =
      Math.min(
        (elapsed / 5000) * 100,
        100
      );


    setHoldProgress(
      progress
    );


    setIsHoldingSign(
      elapsed < 5000
    );


    // ================================================
    // CAPTURE SIGN AFTER 5 SECONDS
    // ================================================

    if (
      elapsed >= 5000 &&
      lastGestureAddedRef.current !==
        gestureName
    ) {

      setTranslation(
        (previous) => [
          ...previous,
          word,
        ]
      );


      lastGestureAddedRef.current =
        gestureName;


      setIsHoldingSign(
        false
      );


      setSignCaptured(
        true
      );


      setHoldProgress(
        100
      );


      // Keep the success
      // animation for 1.2 seconds.

      setTimeout(() => {

        setSignCaptured(
          false
        );

      }, 1200);
    }
  };


  // ================================================
  // PROCESS VIDEO
  // ================================================

  const processVideo = () => {

    const video =
      videoRef.current;

    const recognizer =
      recognizerRef.current;


    if (
      !video ||
      !recognizer ||
      video.readyState <
        2
    ) {

      animationRef.current =
        requestAnimationFrame(
          processVideo
        );

      return;
    }


    try {

      const now =
        performance.now();


      const results =
        recognizer.recognizeForVideo(
          video,
          now
        );


      drawHands(
        results
      );

    } catch (err) {

      console.error(
        "Recognition error:",
        err
      );
    }


    animationRef.current =
      requestAnimationFrame(
        processVideo
      );
  };


  // ================================================
  // CLEAR TRANSLATION
  // ================================================

  const clearTranslation = () => {

    setTranslation([]);

    setRecognizedGesture(
      "No sign detected"
    );

    setHoldProgress(0);

    setIsHoldingSign(false);

    setSignCaptured(false);


    lastGestureRef.current =
      "";

    lastGestureTimeRef.current =
      0;

    lastGestureAddedRef.current =
      "";
  };


  // ================================================
  // INITIALIZATION
  // ================================================

  useEffect(() => {

    let mounted = true;


    const initialize = async () => {

      const recognizer =
        await loadGestureRecognizer();


      if (!mounted || !recognizer) {
        return;
      }


      await startCamera();


      if (!mounted) {
        return;
      }


      processVideo();
    };


    initialize();


    // ================================================
    // CLEANUP
    // ================================================

    return () => {

      mounted = false;


      if (
        animationRef.current
      ) {

        cancelAnimationFrame(
          animationRef.current
        );
      }


      if (
        videoRef.current?.srcObject
      ) {

        const tracks =
          videoRef.current
            .srcObject
            .getTracks();


        tracks.forEach(
          (track) =>
            track.stop()
        );


        videoRef.current.srcObject =
          null;
      }


      if (
        recognizerRef.current
      ) {

        recognizerRef.current.close();

        recognizerRef.current =
          null;
      }
    };

  }, []);


  // ================================================
  // RETURN
  // ================================================

  return {

    videoRef,

    canvasRef,


    cameraStatus,

    handDetected,

    recognizedGesture,


    translation,

    error,


    // New UI states

    holdProgress,

    isHoldingSign,

    signCaptured,


    clearTranslation,
  };
};