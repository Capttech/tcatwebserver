"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type QuizSubmission = {
    attemptId: number;
    participantName: string;
    score: number | null;
    totalQuestions: number | null;
    startedAt: string;
    completedAt: string | null;
    updatedAt: string;
};

type QuizSubmissionResponse = {
    quiz: {
        id: number;
        title: string;
        quizCode: string;
    };
    submissionCount: number;
    submissions: QuizSubmission[];
};

export default function AdminQuizSubmissions({ quizId }: { quizId: number }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<QuizSubmissionResponse | null>(null);

    const loadSubmissions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/grades/${quizId}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load submissions (${res.status})`);
            }

            setData({
                quiz: body.quiz,
                submissionCount: body.submissionCount,
                submissions: Array.isArray(body.submissions) ? body.submissions : [],
            });
        } catch (err: any) {
            setError(err?.message || "Failed to load submissions.");
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [quizId]);

    useEffect(() => {
        loadSubmissions();
    }, [loadSubmissions]);

    return (
        <section className="space-y-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Quiz Submissions</h1>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {loading || !data ? "Loading quiz details..." : `${data.quiz.title} (${data.quiz.quizCode})`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={loadSubmissions}
                            disabled={loading}
                            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                            {loading ? "Refreshing..." : "Refresh"}
                        </button>
                        <Link
                            href="/admin"
                            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                            Back to Admin
                        </Link>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                    {error}
                </div>
            )}

            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <h2 className="font-medium tracking-tight">All Submissions</h2>

                {loading ? (
                    <div className="mt-3 text-sm text-zinc-500">Loading submissions...</div>
                ) : !data || data.submissions.length === 0 ? (
                    <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                        No submissions for this quiz yet.
                    </div>
                ) : (
                    <>
                        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Total submissions: {data.submissionCount}</div>
                        <div className="mt-3 space-y-2">
                            {data.submissions.map((submission) => {
                                const safeScore = typeof submission.score === "number" ? submission.score : 0;
                                const safeTotal = typeof submission.totalQuestions === "number" ? submission.totalQuestions : 0;
                                const percent = safeTotal > 0 ? Math.round((safeScore / safeTotal) * 100) : 0;

                                return (
                                    <div key={submission.attemptId} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                        <div className="text-sm font-medium">{submission.participantName}</div>
                                        <div className="text-xs text-zinc-500">Score: {safeScore}/{safeTotal} ({percent}%)</div>
                                        <div className="mt-1 text-xs text-zinc-500">
                                            Submitted: {new Date(submission.completedAt || submission.updatedAt).toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
