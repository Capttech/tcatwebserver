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
    createdAt: string;
    updatedAt: string;
    questions: AdminQuestion[];
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

export default function AdminPanel() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"tickets" | "quizzes">("tickets");

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
    const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
    const [actionBusy, setActionBusy] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

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
        setIsCreateQuizModalOpen(true);
    }

    async function createQuizHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const title = newQuizTitle.trim();
        if (!title) {
            setActionError("Quiz title is required.");
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
                body: JSON.stringify({ title, description: newQuizDescription.trim() }),
            });
            const body = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error(body?.error || `Failed to create quiz (${res.status})`);
            }

            setNewQuizTitle("");
            setNewQuizDescription("");
            setIsCreateQuizModalOpen(false);
            await loadQuizzes();
        } catch (err: any) {
            setActionError(err?.message || "Failed to create quiz.");
        } finally {
            setActionBusy(false);
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

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                            <div className="space-y-4 xl:col-span-1">
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
                            </div>

                            <div className="space-y-4 xl:col-span-2">
                                <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
                                    Use the <span className="font-medium text-zinc-800 dark:text-zinc-200">Edit</span> button on any quiz to open the quick edit page with all questions and controls.
                                </div>
                            </div>
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
                            <input
                                value={newQuizTitle}
                                onChange={(e) => setNewQuizTitle(e.target.value)}
                                placeholder="Quiz title"
                                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                            />
                            <textarea
                                value={newQuizDescription}
                                onChange={(e) => setNewQuizDescription(e.target.value)}
                                placeholder="Quiz description (optional)"
                                rows={4}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                            />
                        </form>
                    </Modal>
                )}
            </main>
        </div>
    );
}
