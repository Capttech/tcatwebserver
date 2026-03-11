"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type QuizQuestion = {
  id: number;
  prompt: string;
  options: [string, string, string, string];
  correctOption: number;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  quizCode: string;
  durationMinutes: number;
  questions: QuizQuestion[];
};

type QuizAttempt = {
  id: number;
  quizId: number;
  quizCode: string;
  participantName: string;
  startedAt: string;
  expiresAt: string;
  isCompleted: boolean;
  completedAt: string | null;
  score: number | null;
  totalQuestions: number | null;
  createdAt: string;
  updatedAt: string;
};

type SessionStatus = "ready" | "active" | "expired" | "completed";

type SessionResponse = {
  ok: true;
  status: SessionStatus;
  quiz: Quiz;
  attempt?: QuizAttempt;
};

export default function QuizClient() {
  const [quizCode, setQuizCode] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [step, setStep] = useState<"entry" | "preview" | "active" | "expired">("entry");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [completedScore, setCompletedScore] = useState<{ score: number; totalQuestions: number } | null>(null);
  const progressStorageKey = quiz ? `tcat_quiz_progress_${quiz.id}_${participantName.trim().toLowerCase()}` : null;

  function applySession(body: SessionResponse, nextCode: string, nextName: string) {
    setQuiz(body.quiz);
    setQuizCode(nextCode);
    setParticipantName(nextName);
    setError(null);

    if (body.status === "completed") {
      const nextAttempt = body.attempt || null;
      setAttempt(nextAttempt);
      setCompletedScore(
        nextAttempt && typeof nextAttempt.score === "number" && typeof nextAttempt.totalQuestions === "number"
          ? { score: nextAttempt.score, totalQuestions: nextAttempt.totalQuestions }
          : null
      );
      setSubmitted(true);
      setStep("active");
      return;
    }

    setCompletedScore(null);
    setSubmitted(false);

    if (body.status === "expired") {
      setAttempt(body.attempt || null);
      setStep("expired");
      return;
    }

    if (body.status === "active") {
      setAttempt(body.attempt || null);
      setStep("active");
      return;
    }

    setAttempt(null);
    setStep("preview");
  }

  async function fetchSession(nextCode: string, nextName: string, start: boolean) {
    const res = await fetch("/api/quizzes/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ quizCode: nextCode, participantName: nextName, start }),
    });
    const body = await res.json().catch(() => null);

    if (!res.ok || !body?.ok) {
      throw new Error(body?.error || `Failed to load quiz (${res.status})`);
    }

    return body as SessionResponse;
  }

  useEffect(() => {
    if (!progressStorageKey) return;

    const raw = localStorage.getItem(progressStorageKey);
    if (raw) {
      try {
        setAnswers(JSON.parse(raw));
      } catch {
        setAnswers({});
      }
    } else {
      setAnswers({});
    }
  }, [progressStorageKey]);

  useEffect(() => {
    if (!progressStorageKey) return;
    localStorage.setItem(progressStorageKey, JSON.stringify(answers));
  }, [answers, progressStorageKey]);

  useEffect(() => {
    if (!attempt) {
      setRemainingSeconds(0);
      return;
    }

    function updateRemaining() {
      const ms = new Date(attempt.expiresAt).getTime() - Date.now();
      const seconds = Math.max(0, Math.ceil(ms / 1000));
      setRemainingSeconds(seconds);

      if (seconds <= 0) {
        setStep("expired");
      }
    }

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [attempt]);

  async function continueToPreviewOrResume() {
    const code = quizCode.trim().toUpperCase();
    const name = participantName.trim();

    if (!code) {
      setError("Quiz code is required.");
      return;
    }

    if (!name) {
      setError("Name is required.");
      return;
    }

    setLoadingQuiz(true);
    setError(null);
    try {
      const session = await fetchSession(code, name, false);
      applySession(session, code, name);
      setAnswers({});
    } catch (err: any) {
      setQuiz(null);
      setAttempt(null);
      setStep("entry");
      setSubmitted(false);
      setAnswers({});
      setError(err?.message || "Unable to load quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  }

  async function startQuiz() {
    const code = quizCode.trim().toUpperCase();
    const name = participantName.trim();

    if (!code) {
      setError("Quiz code is required.");
      return;
    }

    if (!name) {
      setError("Name is required.");
      return;
    }

    setLoadingQuiz(true);
    setError(null);
    try {
      const session = await fetchSession(code, name, true);
      applySession(session, code, name);
      setAnswers({});
    } catch (err: any) {
      setQuiz(null);
      setAttempt(null);
      setStep("entry");
      setSubmitted(false);
      setAnswers({});
      setError(err?.message || "Unable to load quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  }

  function select(qid: number, idx: number) {
    setAnswers((s) => ({ ...s, [qid]: idx }));
  }

  async function submit() {
    if (!quiz || !attempt) return;

    const score = quiz.questions.reduce((acc, q) => {
      const answer = answers[q.id];
      return acc + (answer === q.correctOption ? 1 : 0);
    }, 0);

    setSubmitBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/quizzes/session/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          attemptId: attempt.id,
          score,
          totalQuestions: quiz.questions.length,
        }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok || !body?.ok) {
        throw new Error(body?.error || `Failed to submit quiz (${res.status})`);
      }

      setCompletedScore({ score, totalQuestions: quiz.questions.length });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit quiz.");
    } finally {
      setSubmitBusy(false);
    }
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    if (progressStorageKey) {
      localStorage.removeItem(progressStorageKey);
    }
  }

  function clearQuizState() {
    setQuiz(null);
    setAttempt(null);
    setAnswers({});
    setSubmitted(false);
    setCompletedScore(null);
    setError(null);
    setStep("entry");
  }

  const mm = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const ss = String(remainingSeconds % 60).padStart(2, "0");

  if (step === "entry") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Join Quiz</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your quiz code and name.</p>
        {error && <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">{error}</div>}
        <div className="mt-4 space-y-2">
          <div className="space-y-1">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Quiz Code</div>
            <input
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
              placeholder="Quiz code"
              className="w-full rounded-lg bg-white/80 px-3 py-2 text-sm uppercase shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-950/80"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Name</div>
            <input
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg bg-white/80 px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-950/80"
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={continueToPreviewOrResume}
            disabled={loadingQuiz}
            className="px-3 py-2 rounded bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingQuiz ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "preview" && quiz) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl bg-zinc-50/80 p-4 dark:bg-zinc-900/60">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight">{quiz.title}</h3>
            <div className="inline-flex rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {quiz.durationMinutes} minute(s)
            </div>
          </div>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{quiz.description || "No description provided."}</p>

          <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-md bg-white/80 px-3 py-2 dark:bg-zinc-950/60">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Name: </span>
              <span className="text-zinc-600 dark:text-zinc-400">{participantName}</span>
            </div>
            <div className="rounded-md bg-white/80 px-3 py-2 dark:bg-zinc-950/60">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Quiz Code: </span>
              <span className="text-zinc-600 dark:text-zinc-400">{quizCode}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={startQuiz}
            disabled={loadingQuiz}
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingQuiz ? "Starting..." : "Start Quiz"}
          </button>
          <button
            onClick={clearQuizState}
            disabled={loadingQuiz}
            className="px-4 py-2 rounded bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Change Quiz
          </button>
        </div>
      </div>
    );
  }

  if (step === "expired") {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Quiz Expired</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">This quiz has expired.</p>
      </div>
    );
  }

  if (!quiz || !attempt) {
    return null;
  }

  if (submitted) {
    const score = completedScore?.score ?? attempt.score ?? 0;
    const totalQuestions = completedScore?.totalQuestions ?? attempt.totalQuestions ?? quiz.questions.length;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Quiz Complete</h3>
        <div className="text-base font-medium">Score: {score}/{totalQuestions}</div>
        <Link
          href="/"
          className="inline-flex px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <div className="rounded-md bg-zinc-100/80 px-3 py-1 text-sm font-semibold text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-100">Time Left: {mm}:{ss}</div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{quiz.description || "Complete all questions and submit to see your score."}</p>

      <div className="mt-4 space-y-4">
        {quiz.questions.map((q, qi) => (
          <div key={q.id} className="rounded-xl bg-zinc-50/80 p-4 dark:bg-zinc-900/60">
            <div className="font-medium">{qi + 1}. {q.prompt}</div>
            <div className="mt-2 space-y-2">
              {q.options.map((c, idx) => {
                const checked = answers[q.id] === idx;
                const isCorrect = submitted && idx === q.correctOption;
                const isWrong = submitted && checked && idx !== q.correctOption;
                return (
                  <label key={idx} className={`flex items-center gap-2 rounded p-2 transition ${isCorrect ? 'bg-green-50 dark:bg-green-900/30' : ''} ${isWrong ? 'bg-red-50 dark:bg-red-900/30' : ''} ${!isCorrect && !isWrong ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800/70' : ''}`}>
                    <input type="radio" name={`${q.id}`} checked={checked || false} onChange={() => select(q.id, idx)} />
                    <span>{c}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={submit} disabled={submitBusy} className="px-3 py-1 rounded bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-70">{submitBusy ? "Submitting..." : "Submit"}</button>
        <button onClick={reset} className="px-3 py-1 rounded bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700">Reset</button>
      </div>
    </div>
  );
}
