"use client";
import { useEffect, useState } from "react";

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

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('tcat_tickets');
    if (raw) setTickets(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('tcat_tickets', JSON.stringify(tickets));
  }, [tickets]);

  async function logout() {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    try { localStorage.removeItem('tcat_admin_public'); } catch {}
    window.location.reload();
  }

  function markReturned(id: string) {
    setTickets((s) => s.map(t => t.id === id ? { ...t, returned: true, returnTime: new Date().toISOString() } : t));
  }

  function exportCSV() {
    const header = ["id","student","studentId","location","reason","timeOut","expectedReturn","returned","returnTime","instructor"];
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
    <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <aside className="md:col-span-1 p-4 border rounded bg-white dark:bg-zinc-900">
        <h3 className="font-semibold">Admin</h3>
        <nav className="mt-4 space-y-2">
          <a href="/instructors" className="block text-sm text-indigo-600 hover:underline">Instructors</a>
          <a href="/quizzes" className="block text-sm text-indigo-600 hover:underline">Quizzes</a>
          <a href="/tickets" className="block text-sm text-indigo-600 hover:underline">Tickets</a>
        </nav>

        <div className="mt-6">
          <button onClick={exportCSV} className="w-full px-3 py-2 rounded border">Export Tickets</button>
        </div>

        <div className="mt-4">
          <button onClick={logout} disabled={loading} className="w-full px-3 py-2 rounded bg-red-600 text-white">{loading ? 'Logging out...' : 'Log out'}</button>
        </div>
      </aside>

      <main className="md:col-span-3 space-y-4">
        <div className="p-4 border rounded bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-zinc-600">Overview and quick actions.</p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 border rounded">
              <div className="text-xs text-zinc-500">Tickets</div>
              <div className="text-2xl font-bold">{total}</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-zinc-500">Active</div>
              <div className="text-2xl font-bold">{active}</div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-zinc-500">Returned</div>
              <div className="text-2xl font-bold">{returned}</div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded bg-white dark:bg-zinc-900">
          <h3 className="font-medium">Recent Tickets</h3>
          <div className="mt-3 space-y-2">
            {tickets.length === 0 && <div className="text-sm text-zinc-600">No tickets recorded.</div>}
            {tickets.slice(0, 10).map(t => (
              <div key={t.id} className="p-2 rounded border flex items-start justify-between">
                <div>
                  <div className="font-medium">{t.student} {t.studentId ? `· ${t.studentId}` : ''}</div>
                  <div className="text-sm text-zinc-600">{t.location} — {t.reason}</div>
                  <div className="text-xs text-zinc-500">Out: {new Date(t.timeOut).toLocaleString()}</div>
                  {t.returned && <div className="text-xs text-green-600">Returned: {t.returnTime ? new Date(t.returnTime).toLocaleString() : ''}</div>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {!t.returned ? <button onClick={()=>markReturned(t.id)} className="px-2 py-1 rounded bg-green-600 text-white">Mark Returned</button> : <span className="text-sm">✅</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
