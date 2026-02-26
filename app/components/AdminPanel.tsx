"use client";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Modal from "./Modal";

type Ticket = {
  id: string;
  student: string;
  studentId?: string;
  location: string;
  reason: string;
  timeOut: string;
  expectedReturn?: string;
  returned?: boolean;
  returnTime?: string;
  instructor?: string;
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

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<"tickets" | "quizzes">("tickets");

  const [quizzes, setQuizzes] = useState<AdminQuiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(false);
  const [quizzesError, setQuizzesError] = useState<string | null>(null);

  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('tcat_tickets');
    if (raw) setTickets(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('tcat_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const loadQuizzes = useCallback(async () => {
    setQuizzesLoading(true);
    setQuizzesError(null);
    try {
      const res = await fetch('/api/admin/quizzes', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });
      const body = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(body?.error || `Failed to load quizzes (${res.status})`);
      }

      const nextQuizzes = Array.isArray(body?.quizzes) ? body.quizzes : [];
      setQuizzes(nextQuizzes);
    } catch (err: any) {
      setQuizzesError(err?.message || 'Failed to load quizzes.');
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
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
      });
    } finally {
      try { localStorage.removeItem('tcat_admin_public'); } catch { }
      window.location.reload();
    }
  }

  function markReturned(id: string) {
    setTickets((s) => s.map(t => t.id === id ? { ...t, returned: true, returnTime: new Date().toISOString() } : t));
  }

  function openCreateQuizModal() {
    setActionError(null);
    setNewQuizTitle('');
    setNewQuizDescription('');
    setIsCreateQuizModalOpen(true);
  }

  async function createQuizHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = newQuizTitle.trim();
    if (!title) {
      setActionError('Quiz title is required.');
      return;
    }

    setActionBusy(true);
    setActionError(null);
    try {
      const res = await fetch('/api/admin/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ title, description: newQuizDescription.trim() }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error || `Failed to create quiz (${res.status})`);
      }

      setNewQuizTitle('');
      setNewQuizDescription('');
      setIsCreateQuizModalOpen(false);
      await loadQuizzes();
    } catch (err: any) {
      setActionError(err?.message || 'Failed to create quiz.');
    } finally {
      setActionBusy(false);
    }
  }

  function exportCSV() {
    const header = ["id", "student", "studentId", "location", "reason", "timeOut", "expectedReturn", "returned", "returnTime", "instructor"];
    const rows = tickets.map(t => header.map(h => (t as any)[h] ?? "").join(","));
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
  const active = tickets.filter(t => !t.returned).length;
  const returned = tickets.filter(t => t.returned).length;

  return (
    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-4">
      <aside className="md:col-span-1 space-y-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <h3 className="font-semibold tracking-tight">Admin Tools</h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Choose what you want to manage.</p>

          <nav className="mt-4 space-y-2">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeTab === 'quizzes'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
                }`}
            >
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeTab === 'tickets'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
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
            {loading ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </aside>

      <main className="md:col-span-3 space-y-4">
        {activeTab === 'tickets' && (
          <>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <h2 className="text-lg font-semibold tracking-tight">Ticket Dashboard</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Overview and quick actions.</p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Tickets</div>
                  <div className="text-2xl font-bold tracking-tight">{total}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Active</div>
                  <div className="text-2xl font-bold tracking-tight">{active}</div>
                </div>
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">Returned</div>
                  <div className="text-2xl font-bold tracking-tight">{returned}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <h3 className="font-medium tracking-tight">Recent Tickets</h3>
              <div className="mt-3 space-y-2">
                {tickets.length === 0 && (
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
                    No tickets recorded.
                  </div>
                )}
                {tickets.slice(0, 10).map(t => (
                  <div key={t.id} className="flex items-start justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div>
                      <div className="font-medium">
                        {t.student} {t.studentId ? `· ${t.studentId}` : ''}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">{t.location} — {t.reason}</div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-500">Out: {new Date(t.timeOut).toLocaleString()}</div>
                      {t.returned && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Returned: {t.returnTime ? new Date(t.returnTime).toLocaleString() : ''}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {!t.returned ? (
                        <button
                          onClick={() => markReturned(t.id)}
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-500"
                        >
                          Mark Returned
                        </button>
                      ) : (
                        <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-950/50 dark:text-green-300">
                          Returned
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'quizzes' && (
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

        {activeTab === 'quizzes' && (
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
                  {actionBusy ? 'Saving...' : 'Create Quiz'}
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
