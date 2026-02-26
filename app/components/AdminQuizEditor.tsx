"use client";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Modal from "./Modal";

type AdminQuestion = {
    id: number;
    quizId: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

type AdminQuiz = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    questions: AdminQuestion[];
};

type QuestionFormState = {
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
};

const EMPTY_QUESTION: QuestionFormState = {
    prompt: "",
    options: ["", "", "", ""],
    correctOption: 0,
};

export default function AdminQuizEditor({ quizId }: { quizId: number }) {
    const [loading, setLoading] = useState(true);
    const [actionBusy, setActionBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [quiz, setQuiz] = useState<AdminQuiz | null>(null);
    const [editQuizTitle, setEditQuizTitle] = useState("");
    const [editQuizDescription, setEditQuizDescription] = useState("");

    const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] = useState(false);
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
    const [questionForm, setQuestionForm] = useState<QuestionFormState>(EMPTY_QUESTION);

    const loadQuiz = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/quizzes/${quizId}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load quiz (${res.status})`);
            }

            const nextQuiz = body?.quiz as AdminQuiz;
            setQuiz(nextQuiz);
            setEditQuizTitle(nextQuiz?.title || "");
            setEditQuizDescription(nextQuiz?.description || "");
        } catch (err: any) {
            setError(err?.message || "Failed to load quiz.");
            setQuiz(null);
        } finally {
            setLoading(false);
        }
    }, [quizId]);

    useEffect(() => {
        loadQuiz();
    }, [loadQuiz]);

    async function saveQuiz() {
        if (!quiz) return;
        const title = editQuizTitle.trim();

        if (!title) {
            setError("Quiz title is required.");
            return;
        }

        setActionBusy(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/quizzes/${quiz.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({ title, description: editQuizDescription.trim() }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to update quiz (${res.status})`);
            }

            await loadQuiz();
        } catch (err: any) {
            setError(err?.message || "Failed to update quiz.");
        } finally {
            setActionBusy(false);
        }
    }

    async function deleteQuiz() {
        if (!quiz) return;
        if (!window.confirm(`Delete quiz "${quiz.title}" and all questions?`)) return;

        setActionBusy(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/quizzes/${quiz.id}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to delete quiz (${res.status})`);
            }

            window.location.href = "/admin";
        } catch (err: any) {
            setError(err?.message || "Failed to delete quiz.");
        } finally {
            setActionBusy(false);
        }
    }

    function openCreateQuestionModal() {
        setError(null);
        setQuestionForm(EMPTY_QUESTION);
        setIsCreateQuestionModalOpen(true);
    }

    function openEditQuestionModal(question: AdminQuestion) {
        setError(null);
        setActiveQuestionId(question.id);
        setQuestionForm({
            prompt: question.prompt,
            options: [...question.options] as [string, string, string, string],
            correctOption: question.correctOption,
        });
        setIsEditQuestionModalOpen(true);
    }

    function validateQuestionForm() {
        if (!questionForm.prompt.trim()) {
            setError("Question prompt is required.");
            return false;
        }

        if (questionForm.options.some((option) => !option.trim())) {
            setError("All 4 answer options are required.");
            return false;
        }

        return true;
    }

    async function createQuestion(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!quiz) return;
        if (!validateQuestionForm()) return;

        setActionBusy(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/quizzes/${quiz.id}/questions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    prompt: questionForm.prompt.trim(),
                    options: questionForm.options.map((option) => option.trim()),
                    correctOption: questionForm.correctOption,
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to create question (${res.status})`);
            }

            setIsCreateQuestionModalOpen(false);
            setQuestionForm(EMPTY_QUESTION);
            await loadQuiz();
        } catch (err: any) {
            setError(err?.message || "Failed to create question.");
        } finally {
            setActionBusy(false);
        }
    }

    async function saveQuestion(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!quiz || !activeQuestionId) return;
        if (!validateQuestionForm()) return;

        setActionBusy(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/quizzes/${quiz.id}/questions/${activeQuestionId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    prompt: questionForm.prompt.trim(),
                    options: questionForm.options.map((option) => option.trim()),
                    correctOption: questionForm.correctOption,
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to update question (${res.status})`);
            }

            setIsEditQuestionModalOpen(false);
            setActiveQuestionId(null);
            setQuestionForm(EMPTY_QUESTION);
            await loadQuiz();
        } catch (err: any) {
            setError(err?.message || "Failed to update question.");
        } finally {
            setActionBusy(false);
        }
    }

    async function deleteQuestion(questionId: number) {
        if (!quiz) return;
        if (!window.confirm("Delete this question?")) return;

        setActionBusy(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/quizzes/${quiz.id}/questions/${questionId}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to delete question (${res.status})`);
            }

            await loadQuiz();
        } catch (err: any) {
            setError(err?.message || "Failed to delete question.");
        } finally {
            setActionBusy(false);
        }
    }

    if (loading) {
        return <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">Loading quiz...</div>;
    }

    if (!quiz) {
        return (
            <div className="space-y-3">
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                    {error || "Quiz not found."}
                </div>
                <Link href="/admin" className="inline-flex rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                    Back to Admin
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight">Quick Edit: {quiz.title}</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Manage quiz details and all questions from one place.</p>
                </div>
                <Link href="/admin" className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                    Back
                </Link>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                    {error}
                </div>
            )}

            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <h3 className="font-medium tracking-tight">Quiz Details</h3>
                <div className="mt-3 space-y-3">
                    <input
                        value={editQuizTitle}
                        onChange={(e) => setEditQuizTitle(e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <textarea
                        rows={3}
                        value={editQuizDescription}
                        onChange={(e) => setEditQuizDescription(e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={saveQuiz}
                            disabled={actionBusy}
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            Save Quiz
                        </button>
                        <button
                            onClick={deleteQuiz}
                            disabled={actionBusy}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            Delete Quiz
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium tracking-tight">Questions ({quiz.questions.length})</h3>
                    <button
                        onClick={openCreateQuestionModal}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                    >
                        Create Question
                    </button>
                </div>

                {quiz.questions.length === 0 ? (
                    <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                        No questions in this quiz yet.
                    </div>
                ) : (
                    <div className="mt-3 space-y-2">
                        {quiz.questions.map((question, index) => (
                            <div key={question.id} className="flex items-start justify-between gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                <div>
                                    <div className="text-sm font-medium">Q{index + 1}. {question.prompt}</div>
                                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Correct: Option {question.correctOption + 1}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEditQuestionModal(question)}
                                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteQuestion(question.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-sm text-white transition hover:bg-red-500"
                                        aria-label="Delete question"
                                        title="Delete question"
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={isCreateQuestionModalOpen}
                title="Create Question"
                subtitle="Add a new question and answer options."
                onClose={() => setIsCreateQuestionModalOpen(false)}
                actions={(
                    <>
                        <button
                            type="button"
                            onClick={() => setIsCreateQuestionModalOpen(false)}
                            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="create-question-form"
                            disabled={actionBusy}
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {actionBusy ? "Saving..." : "Create Question"}
                        </button>
                    </>
                )}
            >
                <form id="create-question-form" onSubmit={createQuestion} className="space-y-3">
                    <textarea
                        value={questionForm.prompt}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, prompt: e.target.value }))}
                        placeholder="Question prompt"
                        rows={3}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {questionForm.options.map((option, index) => (
                            <input
                                key={index}
                                value={option}
                                onChange={(e) => {
                                    setQuestionForm((prev) => {
                                        const nextOptions = [...prev.options] as [string, string, string, string];
                                        nextOptions[index] = e.target.value;
                                        return { ...prev, options: nextOptions };
                                    });
                                }}
                                placeholder={`Option ${index + 1}`}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                            />
                        ))}
                    </div>
                    <select
                        value={questionForm.correctOption}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, correctOption: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    >
                        <option value={0}>Correct answer: Option 1</option>
                        <option value={1}>Correct answer: Option 2</option>
                        <option value={2}>Correct answer: Option 3</option>
                        <option value={3}>Correct answer: Option 4</option>
                    </select>
                </form>
            </Modal>

            <Modal
                isOpen={isEditQuestionModalOpen}
                title="Edit Question"
                subtitle="Update the question prompt, answers, and correct option."
                onClose={() => setIsEditQuestionModalOpen(false)}
                actions={(
                    <>
                        <button
                            type="button"
                            onClick={() => setIsEditQuestionModalOpen(false)}
                            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="edit-question-form"
                            disabled={actionBusy}
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {actionBusy ? "Saving..." : "Save Changes"}
                        </button>
                    </>
                )}
            >
                <form id="edit-question-form" onSubmit={saveQuestion} className="space-y-3">
                    <textarea
                        value={questionForm.prompt}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, prompt: e.target.value }))}
                        placeholder="Question prompt"
                        rows={3}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {questionForm.options.map((option, index) => (
                            <input
                                key={index}
                                value={option}
                                onChange={(e) => {
                                    setQuestionForm((prev) => {
                                        const nextOptions = [...prev.options] as [string, string, string, string];
                                        nextOptions[index] = e.target.value;
                                        return { ...prev, options: nextOptions };
                                    });
                                }}
                                placeholder={`Option ${index + 1}`}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                            />
                        ))}
                    </div>
                    <select
                        value={questionForm.correctOption}
                        onChange={(e) => setQuestionForm((prev) => ({ ...prev, correctOption: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                    >
                        <option value={0}>Correct answer: Option 1</option>
                        <option value={1}>Correct answer: Option 2</option>
                        <option value={2}>Correct answer: Option 3</option>
                        <option value={3}>Correct answer: Option 4</option>
                    </select>
                </form>
            </Modal>
        </div>
    );
}
