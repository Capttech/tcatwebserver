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

const STORAGE_KEY = "tcat_tickets";

export default function TicketForm() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setTickets(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  function addTicket(e?: any) {
    e?.preventDefault();
    if (!student || !location) return;
    const t: Ticket = {
      id: Date.now().toString(),
      student,
      studentId,
      location,
      reason,
      timeOut: new Date().toISOString(),
      expectedReturn: expectedReturn || undefined,
      returned: false,
      instructor: instructor || undefined,
    };
    setTickets((s) => [t, ...s]);
    setStudent("");
    setStudentId("");
    setLocation("");
    setReason("");
    setExpectedReturn("");
    setInstructor("");
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

  function clearAll() {
    if (!confirm("Clear all tickets? This cannot be undone.")) return;
    setTickets([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-md border">
      <h3 className="text-lg font-semibold">Sign-Out Ticket</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Record when a student leaves campus to fix equipment. Staff can mark returns.</p>

      <form onSubmit={addTicket} className="mt-4 grid grid-cols-1 gap-2">
        <input value={student} onChange={e=>setStudent(e.target.value)} placeholder="Student name" className="p-2 border rounded" />
        <input value={studentId} onChange={e=>setStudentId(e.target.value)} placeholder="Student ID (optional)" className="p-2 border rounded" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location (e.g., Building / Lab)" className="p-2 border rounded" />
        <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason / task" className="p-2 border rounded" />
        <input value={expectedReturn} onChange={e=>setExpectedReturn(e.target.value)} placeholder="Expected return time (optional)" className="p-2 border rounded" />
        <input value={instructor} onChange={e=>setInstructor(e.target.value)} placeholder="Instructor on duty (optional)" className="p-2 border rounded" />

        <div className="flex gap-2">
          <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">Check Out</button>
          <button type="button" onClick={exportCSV} className="px-3 py-1 rounded border">Export CSV</button>
          <button type="button" onClick={clearAll} className="px-3 py-1 rounded border text-red-600">Clear All</button>
        </div>
      </form>

      <div className="mt-4">
        <h4 className="font-medium">Current Tickets</h4>
        <div className="mt-2 space-y-2">
          {tickets.length === 0 && <div className="text-sm text-zinc-600">No active tickets.</div>}
          {tickets.map(t => (
            <div key={t.id} className="p-2 rounded border flex items-start justify-between">
              <div>
                <div className="font-medium">{t.student} {t.studentId ? `· ${t.studentId}` : ''}</div>
                <div className="text-sm text-zinc-600">{t.location} — {t.reason}</div>
                <div className="text-xs text-zinc-500">Out: {new Date(t.timeOut).toLocaleString()} {t.expectedReturn ? ` · Expected: ${t.expectedReturn}` : ''}</div>
                {t.returned && <div className="text-xs text-green-600">Returned: {t.returnTime ? new Date(t.returnTime).toLocaleString() : ''}</div>}
              </div>
              <div className="flex flex-col items-end gap-2">
                {!t.returned ? <button onClick={()=>markReturned(t.id)} className="px-2 py-1 rounded bg-green-600 text-white">Mark Returned</button> : <span className="text-sm">✅</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
