"use client";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  text: string;
  choices: string[];
  answer: number;
};

const SAMPLE_QUIZ: Question[] = [
  {
    id: "q1",
    text: "What does HTTP stand for?",
    choices: ["HyperText Transfer Protocol", "Hyperlink Transfer Protocol", "High Transfer Text Protocol"],
    answer: 0,
  },
  {
    id: "q2",
    text: "Which layer of the OSI model is responsible for routing?",
    choices: ["Transport", "Network", "Data Link"],
    answer: 1,
  },
];

export default function QuizClient() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const storageKey = "tcat_quiz_progress";

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers]);

  function select(qid: string, idx: number) {
    setAnswers((s) => ({ ...s, [qid]: idx }));
  }

  function submit() {
    setSubmitted(true);
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    localStorage.removeItem(storageKey);
  }

  const score = SAMPLE_QUIZ.reduce((acc, q) => {
    const a = answers[q.id];
    return acc + (a === q.answer ? 1 : 0);
  }, 0);

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border">
      <h3 className="text-lg font-semibold">Practice Quiz</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Answers are saved locally in your browser.</p>

      <div className="mt-4 space-y-4">
        {SAMPLE_QUIZ.map((q, qi) => (
          <div key={q.id} className="p-3 rounded-md border">
            <div className="font-medium">{qi + 1}. {q.text}</div>
            <div className="mt-2 space-y-2">
              {q.choices.map((c, idx) => {
                const checked = answers[q.id] === idx;
                const isCorrect = submitted && idx === q.answer;
                const isWrong = submitted && checked && idx !== q.answer;
                return (
                  <label key={idx} className={`flex items-center gap-2 p-2 rounded ${isCorrect ? 'bg-green-50' : ''} ${isWrong ? 'bg-red-50' : ''}`}>
                    <input type="radio" name={q.id} checked={checked || false} onChange={() => select(q.id, idx)} />
                    <span>{c}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={submit} className="px-3 py-1 rounded bg-indigo-600 text-white">Submit</button>
        <button onClick={reset} className="px-3 py-1 rounded border">Reset</button>
        {submitted && <div className="ml-auto font-medium">Score: {score}/{SAMPLE_QUIZ.length}</div>}
      </div>
    </div>
  );
}
