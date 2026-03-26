"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

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

function toDateInput(value: string) {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default function AdminTicketEditor({ ticketId }: { ticketId: number }) {
    const [loading, setLoading] = useState(true);
    const [actionBusy, setActionBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [form, setForm] = useState<TicketFormState>({
        teamLeader: "",
        teamMembers: "",
        completionDateTime: "",
        status: "open",
        subject: "",
        breakDown: "",
        resolution: "",
    });

    const loadTicket = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`/api/admin/tickets/${ticketId}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to load ticket (${res.status})`);
            }

            const nextTicket = body?.ticket as Ticket;
            setTicket(nextTicket);
            setForm({
                teamLeader: nextTicket.teamLeader || "",
                teamMembers: nextTicket.teamMembers || "",
                completionDateTime: toDateInput(nextTicket.completionDateTime),
                status: nextTicket.status,
                subject: nextTicket.subject || "",
                breakDown: nextTicket.breakDown || "",
                resolution: nextTicket.resolution || "",
            });
        } catch (err: any) {
            setTicket(null);
            setError(err?.message || "Failed to load ticket.");
        } finally {
            setLoading(false);
        }
    }, [ticketId]);

    useEffect(() => {
        loadTicket();
    }, [loadTicket]);

    async function saveTicket(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!ticket) return;

        if (
            !form.completionDateTime.trim() ||
            !form.subject.trim() ||
            !form.breakDown.trim()
        ) {
            setError("Completion Date, Subject, and Break Down are required.");
            setSuccess(null);
            return;
        }

        setActionBusy(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await fetch(`/api/admin/tickets/${ticket.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: "no-store",
                body: JSON.stringify({
                    teamLeader: form.teamLeader.trim(),
                    teamMembers: form.teamMembers.trim(),
                    completionDateTime: form.completionDateTime,
                    status: form.status,
                    subject: form.subject.trim(),
                    breakDown: form.breakDown.trim(),
                    resolution: form.resolution.trim(),
                }),
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to update ticket (${res.status})`);
            }

            setTicket(body?.ticket as Ticket);
            setSuccess("Ticket saved successfully.");
        } catch (err: any) {
            setError(err?.message || "Failed to update ticket.");
        } finally {
            setActionBusy(false);
        }
    }

    async function deleteCurrentTicket() {
        if (!ticket) return;
        if (!window.confirm(`Delete ticket #${ticket.id}?`)) return;

        setActionBusy(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await fetch(`/api/admin/tickets/${ticket.id}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
            });
            const body = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(body?.error || `Failed to delete ticket (${res.status})`);
            }

            window.location.href = "/admin";
        } catch (err: any) {
            setError(err?.message || "Failed to delete ticket.");
        } finally {
            setActionBusy(false);
        }
    }

    if (loading) {
        return <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">Loading ticket...</div>;
    }

    if (!ticket) {
        return (
            <div className="space-y-3">
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                    {error || "Ticket not found."}
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
                    <h2 className="text-lg font-semibold tracking-tight">Ticket #{ticket.id}</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Edit ticket details and save changes.</p>
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
            {success && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {success}
                </div>
            )}

            <form onSubmit={saveTicket} className="rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 space-y-3">
                <input
                    value={form.teamLeader}
                    onChange={(e) => setForm((prev) => ({ ...prev, teamLeader: e.target.value }))}
                    placeholder="Team Leader"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <textarea
                    value={form.teamMembers}
                    onChange={(e) => setForm((prev) => ({ ...prev, teamMembers: e.target.value }))}
                    placeholder="Team Members"
                    rows={2}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    type="date"
                    value={form.completionDateTime}
                    onChange={(e) => setForm((prev) => ({ ...prev, completionDateTime: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as TicketStatus }))}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                </select>
                <input
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Subject"
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <textarea
                    value={form.breakDown}
                    onChange={(e) => setForm((prev) => ({ ...prev, breakDown: e.target.value }))}
                    placeholder="Break Down"
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <textarea
                    value={form.resolution}
                    onChange={(e) => setForm((prev) => ({ ...prev, resolution: e.target.value }))}
                    placeholder="Resolution"
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950"
                />

                <div className="flex flex-wrap gap-2">
                    <button
                        type="submit"
                        disabled={actionBusy}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {actionBusy ? "Saving..." : "Save Ticket"}
                    </button>
                    <button
                        type="button"
                        onClick={deleteCurrentTicket}
                        disabled={actionBusy}
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        Delete Ticket
                    </button>
                    <Link
                        href={`/ticket-submission/${ticket.id}`}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                        Open Public View
                    </Link>
                </div>
            </form>
        </div>
    );
}
