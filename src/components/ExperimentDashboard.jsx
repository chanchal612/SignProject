import { useCallback, useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";
import { SIGN_VOCABULARY } from "../data/signVocabulary";

/**
 * SignProject experiment dashboard.
 *
 * This component owns its own camera/MediaPipe instance so it can record
 * per-trial timing without changing the existing live-translation hook.
 * It expects SIGN_VOCABULARY to be an object like:
 * { Open_Palm: "Hello", Closed_Fist: "Stop", ... }
 */
const MODEL_WASM =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_ASSET =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

const CONSISTENCY_FRAMES = 15;
const CONFIDENCE_THRESHOLD = 0.65;
const BASELINE_HOLD_MS = 5000;

const pretty = (value) =>
  String(value ?? "").replaceAll("_", " ").replaceAll("-", " ");

function downloadCsv(rows) {
  const headers = [
    "trial_id",
    "timestamp",
    "mode",
    "expected_label",
    "predicted_label",
    "mediapipe_category",
    "confidence",
    "response_time_ms",
    "correct",
    "outcome",
  ];
  const escape = (value) => {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  };
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((key) => escape(row[key])).join(",")),
  ].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `signproject-experiment-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function Stat({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default function ExperimentDashboard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognizerRef = useRef(null);
  const rafRef = useRef(null);
  const mountedRef = useRef(false);

  const trialRef = useRef(null);
  const recentPredictionsRef = useRef([]);
  const baselineCandidateRef = useRef("");
  const baselineSinceRef = useRef(0);
  const lastUiUpdateRef = useRef(0);
  const acceptedThisTrialRef = useRef(false);

  const vocabularyEntries = Object.entries(SIGN_VOCABULARY || {});
  const labels = [...new Set(vocabularyEntries.map(([, label]) => String(label)))];

  const [cameraStatus, setCameraStatus] = useState("starting");
  const [cameraError, setCameraError] = useState("");
  const [handDetected, setHandDetected] = useState(false);
  const [livePrediction, setLivePrediction] = useState({
    category: "None",
    label: "No sign detected",
    score: 0,
  });
  const [expectedLabel, setExpectedLabel] = useState(labels[0] || "");
  const [mode, setMode] = useState("consistency");
  const [trialActive, setTrialActive] = useState(false);
  const [trialStartTime, setTrialStartTime] = useState(null);
  const [records, setRecords] = useState([]);
  const [notice, setNotice] = useState(
    "Choose the correct expected label before starting each attempt."
  );

  const addRecord = useCallback((record) => {
    setRecords((previous) => [
      {
        trial_id: previous.length + 1,
        timestamp: new Date().toISOString(),
        ...record,
      },
      ...previous,
    ]);
  }, []);

  const stopTrial = useCallback(() => {
    trialRef.current = null;
    recentPredictionsRef.current = [];
    baselineCandidateRef.current = "";
    baselineSinceRef.current = 0;
    acceptedThisTrialRef.current = false;
    setTrialActive(false);
    setTrialStartTime(null);
  }, []);

  const finishTrial = useCallback(
    (prediction, outcome = "accepted") => {
      const trial = trialRef.current;
      if (!trial || acceptedThisTrialRef.current) return;

      acceptedThisTrialRef.current = true;
      const responseTime = Math.max(0, Math.round(performance.now() - trial.startedAt));
      const predicted = String(prediction.label || "Unknown");
      const correct = predicted.toLocaleLowerCase() ===
        String(trial.expectedLabel).toLocaleLowerCase();

      addRecord({
        mode: trial.mode,
        expected_label: trial.expectedLabel,
        predicted_label: predicted,
        mediapipe_category: prediction.category || "",
        confidence: Number(prediction.score || 0).toFixed(4),
        response_time_ms: responseTime,
        correct,
        outcome,
      });
      stopTrial();
      setNotice(
        `${outcome === "accepted" ? "Prediction recorded" : "Attempt recorded"}: ` +
        `${predicted} · ${correct ? "correct" : "incorrect"} · ${responseTime} ms`
      );
    },
    [addRecord, stopTrial]
  );

  const startTrial = () => {
    if (cameraStatus !== "active") {
      setNotice("Wait until the camera is active before starting a trial.");
      return;
    }
    if (!expectedLabel) {
      setNotice("Add at least one label in SIGN_VOCABULARY before starting.");
      return;
    }

    recentPredictionsRef.current = [];
    baselineCandidateRef.current = "";
    baselineSinceRef.current = 0;
    acceptedThisTrialRef.current = false;

    const startedAt = performance.now();
    trialRef.current = { expectedLabel, mode, startedAt };
    setTrialStartTime(Date.now());
    setTrialActive(true);
    setNotice(
      mode === "baseline"
        ? "Baseline trial running: the same mapped prediction must persist for 5 seconds."
        : `Consistency trial running: ${CONSISTENCY_FRAMES} consecutive frames, confidence ≥ ${CONFIDENCE_THRESHOLD}.`
    );
  };

  const recordRejected = () => {
    const trial = trialRef.current;
    if (!trial) {
      setNotice("Start a trial first, then record a rejected attempt if needed.");
      return;
    }
    const responseTime = Math.max(0, Math.round(performance.now() - trial.startedAt));
    addRecord({
      mode: trial.mode,
      expected_label: trial.expectedLabel,
      predicted_label: livePrediction.label || "No sign detected",
      mediapipe_category: livePrediction.category || "",
      confidence: Number(livePrediction.score || 0).toFixed(4),
      response_time_ms: responseTime,
      correct: false,
      outcome: "rejected_or_unrecognized",
    });
    stopTrial();
    setNotice(`Rejected/unrecognized attempt recorded · ${responseTime} ms.`);
  };

  useEffect(() => {
    let cancelled = false;
    mountedRef.current = true;
    let stream = null;

    const initialize = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera access requires HTTPS or localhost and a supported browser.");
        }

        setCameraStatus("starting");
        setCameraError("");

        const vision = await FilesetResolver.forVisionTasks(MODEL_WASM);
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_ASSET },
          runningMode: "VIDEO",
          numHands: 1,
        });
        if (cancelled) {
          recognizer.close();
          return;
        }
        recognizerRef.current = recognizer;

        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          recognizer.close();
          return;
        }

        const video = videoRef.current;
        if (!video) throw new Error("Could not find the webcam video element.");
        video.srcObject = stream;
        await video.play();
        if (cancelled) return;
        setCameraStatus("active");

        const loop = () => {
          if (cancelled) return;
          const currentVideo = videoRef.current;
          const currentRecognizer = recognizerRef.current;

          if (currentVideo && currentRecognizer && currentVideo.readyState >= 2) {
            try {
              const now = performance.now();
              const result = currentRecognizer.recognizeForVideo(currentVideo, now);
              const hasHand = Boolean(result.landmarks?.length);
              setHandDetected(hasHand);

              const ctx = canvasRef.current?.getContext("2d");
              const canvas = canvasRef.current;
              if (ctx && canvas && currentVideo.videoWidth) {
                canvas.width = currentVideo.videoWidth;
                canvas.height = currentVideo.videoHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (hasHand) {
                  const points = result.landmarks[0];
                  const links = [
                    [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],
                    [0,9],[9,10],[10,11],[11,12],[0,13],[13,14],[14,15],[15,16],
                    [0,17],[17,18],[18,19],[19,20],[5,9],[9,13],[13,17],
                  ];
                  ctx.strokeStyle = "#a7f3d0";
                  ctx.fillStyle = "#ffffff";
                  ctx.lineWidth = 2;
                  for (const [a, b] of links) {
                    if (!points[a] || !points[b]) continue;
                    ctx.beginPath();
                    ctx.moveTo(points[a].x * canvas.width, points[a].y * canvas.height);
                    ctx.lineTo(points[b].x * canvas.width, points[b].y * canvas.height);
                    ctx.stroke();
                  }
                  for (const point of points) {
                    ctx.beginPath();
                    ctx.arc(point.x * canvas.width, point.y * canvas.height, 3, 0, Math.PI * 2);
                    ctx.fill();
                  }
                }
              }

              const top = result.gestures?.[0]?.[0];
              const category = top?.categoryName || "Unknown";
              const score = Number(top?.score || 0);
              const mapped = SIGN_VOCABULARY?.[category];
              const prediction = {
                category,
                label: mapped ? String(mapped) : (hasHand ? pretty(category) : "No sign detected"),
                score,
              };

              // Avoid forcing React to re-render for every camera frame.
              if (now - lastUiUpdateRef.current >= 120) {
                lastUiUpdateRef.current = now;
                setLivePrediction(prediction);
              }

              const trial = trialRef.current;
              if (trial && !acceptedThisTrialRef.current) {
                if (!hasHand || !mapped) {
                  recentPredictionsRef.current = [];
                  baselineCandidateRef.current = "";
                  baselineSinceRef.current = 0;
                } else if (trial.mode === "baseline") {
                  if (baselineCandidateRef.current !== mapped) {
                    baselineCandidateRef.current = mapped;
                    baselineSinceRef.current = now;
                  } else if (now - baselineSinceRef.current >= BASELINE_HOLD_MS) {
                    finishTrial({ category, label: mapped, score }, "accepted");
                  }
                } else {
                  if (score >= CONFIDENCE_THRESHOLD) {
                    const history = recentPredictionsRef.current;
                    if (history.length && history[history.length - 1].label !== mapped) {
                      history.length = 0;
                    }
                    history.push({ label: mapped, category, score, at: now });
                    if (history.length > CONSISTENCY_FRAMES) history.shift();
                    if (history.length >= CONSISTENCY_FRAMES) {
                      const recent = history.slice(-CONSISTENCY_FRAMES);
                      if (recent.every((item) => item.label === mapped)) {
                        const averageScore =
                          recent.reduce((sum, item) => sum + item.score, 0) / recent.length;
                        finishTrial({ category, label: mapped, score: averageScore }, "accepted");
                      }
                    }
                  } else {
                    recentPredictionsRef.current = [];
                  }
                }
              }
            } catch (error) {
              console.error("Gesture recognition frame failed:", error);
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        loop();
      } catch (error) {
        console.error("Experiment dashboard initialization failed:", error);
        if (!cancelled) {
          setCameraStatus("error");
          setCameraError(error?.message || "Could not initialize the camera or gesture model.");
        }
      }
    };

    initialize();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (recognizerRef.current) {
        recognizerRef.current.close();
        recognizerRef.current = null;
      }
    };
  }, [finishTrial]);

  const total = records.length;
  const accepted = records.filter((row) => row.outcome === "accepted");
  const correctCount = accepted.filter((row) => row.correct).length;
  const incorrectCount = accepted.filter((row) => !row.correct).length;
  const rejectedCount = records.filter((row) => row.outcome !== "accepted").length;
  const accuracy = accepted.length ? `${Math.round((correctCount / accepted.length) * 100)}%` : "—";
  const averageResponse = total
    ? `${Math.round(records.reduce((sum, row) => sum + Number(row.response_time_ms || 0), 0) / total)} ms`
    : "—";

  return (
    <main className="min-h-screen bg-[#f5f3ee] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
              SIGNPROJECT · RESEARCH MODE
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Recognition experiment
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Compare a 5-second baseline hold against a consecutive-frame consistency rule.
              Each recorded attempt is compared with the expected label you select.
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadCsv([...records].reverse())}
            disabled={!records.length}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export CSV ({records.length})
          </button>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="overflow-hidden rounded-3xl bg-slate-950 shadow-lg">
            <div className="relative aspect-video">
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
              <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs font-medium text-white">
                <span className={`h-2 w-2 rounded-full ${cameraStatus === "active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                {cameraStatus === "active" ? "Camera live" : cameraStatus === "error" ? "Camera error" : "Starting camera…"}
              </div>
              {trialActive ? (
                <div className="absolute bottom-4 left-4 rounded-xl bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950">
                  Trial in progress · expected: {expectedLabel}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm">{handDetected ? "✋ Hand detected" : "Searching for hand…"}</span>
              <span className="text-sm text-slate-300">
                {pretty(livePrediction.label)} · {(livePrediction.score * 100).toFixed(1)}% confidence
              </span>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">Configure a trial</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select the sign the participant is attempting before they perform it.
            </p>

            <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="expected-label">
              Expected / ground-truth label
            </label>
            <select
              id="expected-label"
              value={expectedLabel}
              onChange={(event) => setExpectedLabel(event.target.value)}
              disabled={trialActive}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {labels.length ? labels.map((label) => (
                <option key={label} value={label}>{label}</option>
              )) : <option value="">No labels found</option>}
            </select>

            <label className="mt-5 block text-sm font-medium text-slate-700" htmlFor="experiment-mode">
              Recognition mode
            </label>
            <select
              id="experiment-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
              disabled={trialActive}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-600"
            >
              <option value="baseline">Baseline · 5-second hold</option>
              <option value="consistency">Improved · 15 consistent frames + confidence ≥ 65%</option>
            </select>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {mode === "baseline"
                ? "The baseline accepts a mapped prediction after the same label persists for 5 seconds."
                : "The consistency mode accepts a mapped label after 15 consecutive qualifying frames at or above 65% confidence. This is a test setting, not a proven optimum."}
            </div>

            {cameraError ? (
              <div role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {cameraError}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {!trialActive ? (
                <button type="button" onClick={startTrial} className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                  Start trial
                </button>
              ) : (
                <>
                  <button type="button" onClick={recordRejected} className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 hover:bg-amber-100">
                    Record rejected
                  </button>
                  <button type="button" onClick={() => { stopTrial(); setNotice("Trial cancelled; no row was added."); }} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Cancel trial
                  </button>
                </>
              )}
            </div>
            <p aria-live="polite" className="mt-4 text-sm leading-6 text-slate-600">{notice}</p>
          </section>
        </div>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Recorded attempts" value={total} hint="Accepted + rejected/unrecognized" />
          <Stat label="Accepted prediction accuracy" value={accuracy} hint={`${correctCount} correct / ${incorrectCount} incorrect`} />
          <Stat label="Rejected attempts" value={rejectedCount} hint="Manually recorded using the button" />
          <Stat label="Mean response time" value={averageResponse} hint="Across all recorded attempts" />
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">Trial log</h2>
              <p className="mt-1 text-sm text-slate-500">Export these rows as CSV for analysis. The log is kept in page memory only.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear all recorded experiment rows? This cannot be undone.")) {
                  setRecords([]);
                  setNotice("Experiment log cleared.");
                }
              }}
              disabled={!records.length}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Clear log
            </button>
          </div>

          {records.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    {["#", "Mode", "Expected", "Predicted", "Confidence", "Response", "Result"].map((heading) => (
                      <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((row) => (
                    <tr key={`${row.trial_id}-${row.timestamp}`} className="border-t border-slate-100">
                      <td className="px-4 py-3">{row.trial_id}</td>
                      <td className="px-4 py-3">{row.mode === "baseline" ? "Baseline" : "Consistency"}</td>
                      <td className="px-4 py-3">{row.expected_label}</td>
                      <td className="px-4 py-3">{row.predicted_label}</td>
                      <td className="px-4 py-3">{(Number(row.confidence) * 100).toFixed(1)}%</td>
                      <td className="px-4 py-3">{row.response_time_ms} ms</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          row.outcome === "accepted"
                            ? row.correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-800"
                        }`}>
                          {row.outcome === "accepted" ? (row.correct ? "Correct" : "Incorrect") : "Rejected / unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="font-medium text-slate-700">No trials recorded yet</p>
              <p className="mt-1 text-sm text-slate-500">Choose a ground-truth label, select a mode, and start your first trial.</p>
            </div>
          )}
        </section>

        <p className="mt-5 text-xs leading-5 text-slate-500">
          Research note: the consistency mode uses 15 qualifying video frames, not a fixed duration,
          so its response time depends on camera frame rate. Test both modes with the same signs,
          lighting, camera position, and number of attempts. Do not treat these prototype results as
          general sign-language accuracy.
        </p>
      </div>
    </main>
  );
}
