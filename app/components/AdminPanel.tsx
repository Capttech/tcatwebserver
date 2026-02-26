"use client";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Modal from "./Modal";

type TicketStatus = "open" | "close";

type Ticket = {
    id: number;
    teamLeader: string;
    teamMembers: string;
    completionDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
    createdAt: string;
    updatedAt: string;
};

type TicketFormState = {
    teamLeader: string;
    teamMembers: string;
    completionDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
};

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
    quizCode: string;
    durationMinutes: number;
    createdAt: string;
    updatedAt: string;
    questions: AdminQuestion[];
};

type AdminBankQuestion = {
    id: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

type QuestionFormState = {
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
};

const EMPTY_TICKET_FORM: TicketFormState = {
    teamLeader: "",
    teamMembers: "",
    completionDateTime: "",
    status: "open",
    subject: "",
    breakDown: "",
    resolution: "",
};

const EMPTY_QUESTION: QuestionFormState = {
    prompt: "",
    options: ["", "", "", ""],
    correctOption: 0,
};

export default function AdminPanel() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"tickets" | "quizzes" | "questionBank">("tickets");

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [ticketsLoading, setTicketsLoading] = useState(false);
    const [ticketsError, setTicketsError] = useState<string | null>(null);
    const [ticketActionBusy, setTicketActionBusy] = useState(false);
    const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
    const [newTicket, setNewTicket] = useState<TicketFormState>(EMPTY_TICKET_FORM);

    const [quizzes, setQuizzes] = useState<AdminQuiz[]>([]);
    const [quizzesLoading, setQuizzesLoading] = useState(false);
    const [quizzesError, setQuizzesError] = useState<string | null>(null);

    const [newQuizTitle, setNewQuizTitle] = useState("");
    const [newQuizDescription, setNewQuizDescription] = useState("");
    const [newQuizCode, setNewQuizCode] = useState("");
    const [newQuizDurationMinutes, setNewQuizDurationMinutes] = useState("30");
    const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
    const [actionBusy, setActionBusy] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const [questionBank, setQuestionBank] = useState<AdminBankQuestion[]>([]);
    const [questionBankLoading, setQuestionBankLoading] = useState(false);
    const [questionBankError, setQuestionBankError] = useState<string | null>(null);
    const [questionBankBusy, setQuestionBankBusy] = useState(false);
    const [isCreateQuestionBankModalOpen, setIsCreateQuestionBankModalOpen] = useState(false);
    const [isEditQuestionBankModalOpen, setIsEditQuestionBankModalOpen] = useState(false);
    const [activeQuestionBankId, setActiveQuestionBankId] = useState<number | null>(null);
    const [questionBankForm, setQuestionBankForm] = useState<QuestionFormState>(EMPTY_QUESTION);

    const loadTickets = useCallback(async () => {
        setTicketsLoading(true);
        setTicketsError(null);

        try {
            const res = await fetch("/api/admin/tickets", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load tickets (${res.status})`);
            }

            const nextTickets = Array.isArray(body?.tickets) ? body.tickets : [];
            setTickets(nextTickets);
        } catch (err: any) {
            setTicketsError(err?.message || "Failed to load tickets.");
        } finally {
            setTicketsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTickets();
    }, [loadTickets]);

    const loadQuizzes = useCallback(async () => {
        setQuizzesLoading(true);
        setQuizzesError(null);
        try {
            const res = await fetch("/api/admin/quizzes", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load quizzes (${res.status})`);
            }

            const nextQuizzes = Array.isArray(body?.quizzes) ? body.quizzes : [];
            setQuizzes(nextQuizzes);
        } catch (err: any) {
            setQuizzesError(err?.message || "Failed to load quizzes.");
        } finally {
            setQuizzesLoading(false);
        }
    }, []);

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]);

    const loadQuestionBank = useCallback(async () => {
        setQuestionBankLoading(true);
        setQuestionBankError(null);

        try {
            const res = await fetch("/api/admin/question-bank", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load question bank (${res.status})`);
            }

            const nextQuestions = Array.isArray(body?.questions) ? body.questions : [];
            setQuestionBank(nextQuestions);
        } catch (err: any) {
            setQuestionBankError(err?.message || "Failed to load question bank.");
        } finally {
            setQuestionBankLoading(false);
        }
    }, []);

    useEffect(() => {
        loadQuestionBank();
    }, [loadQuestionBank]);

    async function logout() {
        setLoading(true);
        try {
            await fetch("/api/admin/logout", {
                method: "POST",
                credentials: "include",
                cache: "no-store",
            });
        } finally {
            try {
                localStorage.removeItem("tcat_admin_public");
            } catch { }
            window.location.reload();
        }
    }

    function openCreateTicketModal() {
        setTicketsError(null);
        setNewTicket(EMPTY_TICKET_FORM);
        setIsCreateTicketModalOpen(true);
    }

    async function createTicketHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (
            !newTicket.completionDateTime.trim() ||
            !newTicket.subject.trim() ||
            !newTicket.breakDown.trim()
        ) {
            setTicketsError("Completion Date, Subject, and Break Down are required.");
            return;
        }

        setTicketActionBusy(true);
        setTicketsError(null);

        try {
            const res = await fetch("/api/admin/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    teamLeader: newTicket.teamLeader.trim(),
                    teamMembers: newTicket.teamMembers.trim(),
                    completionDateTime: newTicket.completionDateTime,
                    status: newTicket.status,
                    subject: newTicket.subject.trim(),
                    breakDown: newTicket.breakDown.trim(),
                    resolution: newTicket.resolution.trim(),
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to create ticket (${res.status})`);
            }

            setIsCreateTicketModalOpen(false);
            setNewTicket(EMPTY_TICKET_FORM);
            await loadTickets();
        } catch (err: any) {
            setTicketsError(err?.message || "Failed to create ticket.");
        } finally {
            setTicketActionBusy(false);
        }
    }

    async function deleteTicketHandler(ticketId: number) {
        const shouldDelete = window.confirm("Delete this ticket?");
        if (!shouldDelete) return;

        setTicketActionBusy(true);
        setTicketsError(null);

        try {
            const res = await fetch(`/api/admin/tickets/${ticketId}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to delete ticket (${res.status})`);
            }

            await loadTickets();
        } catch (err: any) {
            setTicketsError(err?.message || "Failed to delete ticket.");
        } finally {
            setTicketActionBusy(false);
        }
    }

    function openCreateQuizModal() {
        setActionError(null);
        setNewQuizTitle("");
        setNewQuizDescription("");
        setNewQuizCode("");
        setNewQuizDurationMinutes("30");
        setIsCreateQuizModalOpen(true);
    }

    async function createQuizHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const title = newQuizTitle.trim();
        const quizCode = newQuizCode.trim().toUpperCase();
        const durationMinutes = Number(newQuizDurationMinutes);
        if (!title) {
            setActionError("Quiz title is required.");
            return;
        }

        if (!quizCode) {
            setActionError("Quiz code is required.");
            return;
        }

        if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
            setActionError("Quiz duration must be a whole number greater than 0.");
            return;
        }

        setActionBusy(true);
        setActionError(null);
        try {
            const res = await fetch("/api/admin/quizzes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({ title, description: newQuizDescription.trim(), quizCode, durationMinutes }),
            });
            const body = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(body?.error || `Failed to create quiz (${res.status})`);
            }

            setNewQuizTitle("");
            setNewQuizDescription("");
            setNewQuizCode("");
            setNewQuizDurationMinutes("30");
            setIsCreateQuizModalOpen(false);
            await loadQuizzes();
        } catch (err: any) {
            setActionError(err?.message || "Failed to create quiz.");
        } finally {
            setActionBusy(false);
        }
    }

    function validateQuestionForm(form: QuestionFormState) {
        if (!form.prompt.trim()) {
            setQuestionBankError("Question prompt is required.");
            return false;
        }

        if (form.options.some((option) => !option.trim())) {
            setQuestionBankError("All 4 answer options are required.");
            return false;
        }

        return true;
    }

    function openCreateQuestionBankModal() {
        setQuestionBankError(null);
        setQuestionBankForm(EMPTY_QUESTION);
        setIsCreateQuestionBankModalOpen(true);
    }

    function openEditQuestionBankModal(question: AdminBankQuestion) {
        setQuestionBankError(null);
        setActiveQuestionBankId(question.id);
        setQuestionBankForm({
            prompt: question.prompt,
            options: [...question.options] as [string, string, string, string],
            correctOption: question.correctOption,
        });
        setIsEditQuestionBankModalOpen(true);
    }

    async function createQuestionBankQuestionHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateQuestionForm(questionBankForm)) return;

        setQuestionBankBusy(true);
        setQuestionBankError(null);
        try {
            const res = await fetch("/api/admin/question-bank", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    prompt: questionBankForm.prompt.trim(),
                    options: questionBankForm.options.map((option) => option.trim()),
                    correctOption: questionBankForm.correctOption,
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to create question (${res.status})`);
            }

            setIsCreateQuestionBankModalOpen(false);
            setQuestionBankForm(EMPTY_QUESTION);
            await loadQuestionBank();
        } catch (err: any) {
            setQuestionBankError(err?.message || "Failed to create question.");
        } finally {
            setQuestionBankBusy(false);
        }
    }

    async function saveQuestionBankQuestionHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!activeQuestionBankId) return;
        if (!validateQuestionForm(questionBankForm)) return;

        setQuestionBankBusy(true);
        setQuestionBankError(null);
        try {
            const res = await fetch(`/api/admin/question-bank/${activeQuestionBankId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    prompt: questionBankForm.prompt.trim(),
                    options: questionBankForm.options.map((option) => option.trim()),
                    correctOption: questionBankForm.correctOption,
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to update question (${res.status})`);
            }

            setIsEditQuestionBankModalOpen(false);
            setActiveQuestionBankId(null);
            setQuestionBankForm(EMPTY_QUESTION);
            await loadQuestionBank();
        } catch (err: any) {
            setQuestionBankError(err?.message || "Failed to update question.");
        } finally {
            setQuestionBankBusy(false);
        }
    }

    async function deleteQuestionBankQuestionHandler(questionId: number) {
        if (!window.confirm("Delete this question from the bank?")) return;

        setQuestionBankBusy(true);
        setQuestionBankError(null);
        try {
            const res = await fetch(`/api/admin/question-bank/${questionId}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to delete question (${res.status})`);
            }

            await loadQuestionBank();
        } catch (err: any) {
            setQuestionBankError(err?.message || "Failed to delete question.");
        } finally {
            setQuestionBankBusy(false);
        }
    }

    function exportCSV() {
        const header = [
            "id",
            "teamLeader",
            "teamMembers",
            "completionDateTime",
            "status",
            "subject",
            "breakDown",
            "resolution",
            "createdAt",
            "updatedAt",
        ];

        const rows = tickets.map((ticket) =>
            header
                .map((column) => {
                    const value = (ticket as any)[column] ?? "";
                    const text = String(value).replaceAll('"', '""');
                    return `"${text}"`;
                })
                .join(",")
        );

        const csv = [header.join(","), ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tickets.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    const total = tickets.length;
    const openCount = tickets.filter((ticket) => ticket.status === "open").length;
    const closedCount = tickets.filter((ticket) => ticket.status === "close").length;

    return (
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-4">
            <aside className="md:col-span-1 space-y-4">
                <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                    <h3 className="font-semibold tracking-tight">Admin Tools</h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Choose what you want to manage.</p>

                    <nav className="mt-4 space-y-2">
                        <button
                            onClick={() => setActiveTab("quizzes")}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeTab === "quizzes"
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                                : "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                                }`}
                        >
                            Quizzes
                        </button>
                        <button
                            onClick={() => setActiveTab("questionBank")}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeTab === "questionBank"
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                                : "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                                }`}
                        >
                            Question Bank
                        </button>
                        <button
                            onClick={() => setActiveTab("tickets")}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeTab === "tickets"
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                                : "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                                }`}
                        >
                            Tickets
                        </button>
                    </nav>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                    <button
                        onClick={exportCSV}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Export Tickets
                    </button>

                    <button
                        onClick={logout}
                        disabled={loading}
                        className="mt-3 w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Logging out..." : "Log out"}
                    </button>
                </div>
            </aside>

            <main className="md:col-span-3 space-y-4">
                {activeTab === "tickets" && (
                    <>
                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">Ticket Dashboard</h2>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Full ticket CRUD with shared DB-backed records.</p>
                                </div>
                                <button
                                    onClick={openCreateTicketModal}
                                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                >
                                    Create Ticket
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Tickets</div>
                                    <div className="text-2xl font-bold tracking-tight">{total}</div>
                                </div>
                                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Open</div>
                                    <div className="text-2xl font-bold tracking-tight">{openCount}</div>
                                </div>
                                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Closed</div>
                                    <div className="text-2xl font-bold tracking-tight">{closedCount}</div>
                                </div>
                            </div>
                        </div>

                        {ticketsError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                                {ticketsError}
                            </div>
                        )}

                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <h3 className="font-medium tracking-tight">All Tickets</h3>
                            {ticketsLoading ? (
                                <div className="mt-3 text-sm text-zinc-500">Loading tickets...</div>
                            ) : tickets.length === 0 ? (
                                <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                                    No tickets recorded.
                                </div>
                            ) : (
                                <div className="mt-3 space-y-2">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.id} className="flex items-start justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                            <div>
                                                <div className="font-medium">#{ticket.id} · {ticket.subject}</div>
                                                <div className="text-sm text-zinc-600 dark:text-zinc-400">Team Leader: {ticket.teamLeader}</div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-500">Updated: {new Date(ticket.updatedAt).toLocaleString()}</div>
                                                <span className={`mt-2 inline-flex rounded-md px-2 py-1 text-xs font-medium ${ticket.status === "open"
                                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                                                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                                                    }`}>
                                                    {ticket.status === "open" ? "Open" : "Close"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/tickets/${ticket.id}`}
                                                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteTicketHandler(ticket.id)}
                                                    disabled={ticketActionBusy}
                                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === "questionBank" && (
                    <>
                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">Question Bank</h2>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Create and manage reusable questions for quiz imports.</p>
                                </div>
                                <button
                                    onClick={openCreateQuestionBankModal}
                                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                >
                                    Add Question
                                </button>
                            </div>
                        </div>

                        {questionBankError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                                {questionBankError}
                            </div>
                        )}

                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <h3 className="font-medium tracking-tight">All Bank Questions</h3>
                            {questionBankLoading ? (
                                <div className="mt-3 text-sm text-zinc-500">Loading question bank...</div>
                            ) : questionBank.length === 0 ? (
                                <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                                    No questions in the bank yet.
                                </div>
                            ) : (
                                <div className="mt-3 space-y-2">
                                    {questionBank.map((question, index) => (
                                        <div key={question.id} className="flex items-start justify-between gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                                            <div>
                                                <div className="text-sm font-medium">Q{index + 1}. {question.prompt}</div>
                                                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Correct: Option {question.correctOption + 1}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditQuestionBankModal(question)}
                                                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteQuestionBankQuestionHandler(question.id)}
                                                    disabled={questionBankBusy}
                                                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === "quizzes" && (
                    <>
                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">Quiz Builder</h2>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Create and manage quizzes with full question CRUD.</p>
                                </div>
                                <button
                                    onClick={openCreateQuizModal}
                                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                >
                                    Create Quiz
                                </button>
                            </div>
                        </div>

                        {(quizzesError || actionError) && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                                {quizzesError || actionError}
                            </div>
                        )}

                        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                            <h3 className="font-medium tracking-tight">Existing Quizzes</h3>
                            {quizzesLoading ? (
                                <div className="mt-3 text-sm text-zinc-500">Loading quizzes...</div>
                            ) : quizzes.length === 0 ? (
                                <div className="mt-3 text-sm text-zinc-500">No quizzes yet.</div>
                            ) : (
                                <div className="mt-3 space-y-2">
                                    {quizzes.map((quiz) => (
                                        <div
                                            key={quiz.id}
                                            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-left transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <div className="text-sm font-medium">{quiz.title}</div>
                                                    <div className="text-xs text-zinc-500">{quiz.questions.length} question(s)</div>
                                                    <div className="text-xs text-zinc-500">Code: {quiz.quizCode}</div>
                                                    <div className="text-xs text-zinc-500">Time: {quiz.durationMinutes} min</div>
                                                </div>
                                                <Link
                                                    href={`/admin/quizzes/${quiz.id}`}
                                                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                <Modal
                    isOpen={isCreateTicketModalOpen}
                    title="Create Ticket"
                    subtitle="Create a new ticket record in the shared ticket system."
                    onClose={() => setIsCreateTicketModalOpen(false)}
                    actions={(
                        <>
                            <button
                                type="button"
                                onClick={() => setIsCreateTicketModalOpen(false)}
                                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="create-ticket-form"
                                disabled={ticketActionBusy}
                                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {ticketActionBusy ? "Saving..." : "Create Ticket"}
                            </button>
                        </>
                    )}
                >
                    <form id="create-ticket-form" onSubmit={createTicketHandler} className="space-y-3">
                        <input
                            value={newTicket.teamLeader}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, teamLeader: e.target.value }))}
                            placeholder="Team Leader"
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <textarea
                            value={newTicket.teamMembers}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, teamMembers: e.target.value }))}
                            placeholder="Team Members"
                            rows={2}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <input
                            type="date"
                            value={newTicket.completionDateTime}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, completionDateTime: e.target.value }))}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <select
                            value={newTicket.status}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, status: e.target.value as TicketStatus }))}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        >
                            <option value="open">Open</option>
                            <option value="close">Close</option>
                        </select>
                        <input
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, subject: e.target.value }))}
                            placeholder="Subject"
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <textarea
                            value={newTicket.breakDown}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, breakDown: e.target.value }))}
                            placeholder="Break Down"
                            rows={3}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <textarea
                            value={newTicket.resolution}
                            onChange={(e) => setNewTicket((prev) => ({ ...prev, resolution: e.target.value }))}
                            placeholder="Resolution"
                            rows={3}
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                        />
                    </form>
                </Modal>

                {activeTab === "quizzes" && (
                    <Modal
                        isOpen={isCreateQuizModalOpen}
                        title="Create Quiz"
                        subtitle="Add a new quiz to your admin library."
                        onClose={() => setIsCreateQuizModalOpen(false)}
                        actions={(
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsCreateQuizModalOpen(false)}
                                    className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="create-quiz-form"
                                    disabled={actionBusy}
                                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {actionBusy ? "Saving..." : "Create Quiz"}
                                </button>
                            </>
                        )}
                    >
                        <form id="create-quiz-form" onSubmit={createQuizHandler} className="space-y-3">
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Quiz Title</div>
                                <input
                                    value={newQuizTitle}
                                    onChange={(e) => setNewQuizTitle(e.target.value)}
                                    placeholder="Quiz title"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Quiz Code</div>
                                <input
                                    value={newQuizCode}
                                    onChange={(e) => setNewQuizCode(e.target.value.toUpperCase())}
                                    placeholder="Quiz code (required)"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm uppercase outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Time Allowed (Minutes)</div>
                                <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={newQuizDurationMinutes}
                                    onChange={(e) => setNewQuizDurationMinutes(e.target.value)}
                                    placeholder="Time allowed (minutes)"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Quiz Description</div>
                                <textarea
                                    value={newQuizDescription}
                                    onChange={(e) => setNewQuizDescription(e.target.value)}
                                    placeholder="Quiz description (optional)"
                                    rows={4}
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                            </div>
                        </form>
                    </Modal>
                )}

                {activeTab === "questionBank" && (
                    <>
                        <Modal
                            isOpen={isCreateQuestionBankModalOpen}
                            title="Add Bank Question"
                            subtitle="Create a reusable question for quiz imports."
                            onClose={() => setIsCreateQuestionBankModalOpen(false)}
                            actions={(
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateQuestionBankModalOpen(false)}
                                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form="create-bank-question-form"
                                        disabled={questionBankBusy}
                                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {questionBankBusy ? "Saving..." : "Create Question"}
                                    </button>
                                </>
                            )}
                        >
                            <form id="create-bank-question-form" onSubmit={createQuestionBankQuestionHandler} className="space-y-3">
                                <textarea
                                    value={questionBankForm.prompt}
                                    onChange={(e) => setQuestionBankForm((prev) => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="Question prompt"
                                    rows={3}
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    {questionBankForm.options.map((option, index) => (
                                        <input
                                            key={index}
                                            value={option}
                                            onChange={(e) => {
                                                setQuestionBankForm((prev) => {
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
                                    value={questionBankForm.correctOption}
                                    onChange={(e) => setQuestionBankForm((prev) => ({ ...prev, correctOption: Number(e.target.value) }))}
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
                            isOpen={isEditQuestionBankModalOpen}
                            title="Edit Bank Question"
                            subtitle="Update this reusable bank question."
                            onClose={() => setIsEditQuestionBankModalOpen(false)}
                            actions={(
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditQuestionBankModalOpen(false)}
                                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form="edit-bank-question-form"
                                        disabled={questionBankBusy}
                                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {questionBankBusy ? "Saving..." : "Save Changes"}
                                    </button>
                                </>
                            )}
                        >
                            <form id="edit-bank-question-form" onSubmit={saveQuestionBankQuestionHandler} className="space-y-3">
                                <textarea
                                    value={questionBankForm.prompt}
                                    onChange={(e) => setQuestionBankForm((prev) => ({ ...prev, prompt: e.target.value }))}
                                    placeholder="Question prompt"
                                    rows={3}
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                />
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    {questionBankForm.options.map((option, index) => (
                                        <input
                                            key={index}
                                            value={option}
                                            onChange={(e) => {
                                                setQuestionBankForm((prev) => {
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
                                    value={questionBankForm.correctOption}
                                    onChange={(e) => setQuestionBankForm((prev) => ({ ...prev, correctOption: Number(e.target.value) }))}
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                                >
                                    <option value={0}>Correct answer: Option 1</option>
                                    <option value={1}>Correct answer: Option 2</option>
                                    <option value={2}>Correct answer: Option 3</option>
                                    <option value={3}>Correct answer: Option 4</option>
                                </select>
                            </form>
                        </Modal>
                    </>
                )}
            </main>
        </div>
    );
}
