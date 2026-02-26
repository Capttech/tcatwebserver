"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import PageWrapper from "../../components/PageWrapper";
import SiteHeader from "../../components/SiteHeader";
import WebCard from "../../components/WebCard";

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

const EMPTY_FORM: TicketFormState = {
    teamLeader: "",
    teamMembers: "",
    completionDateTime: "",
    status: "open",
    subject: "",
    breakDown: "",
    resolution: "",
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

export default function TicketSubmissionDetailPage() {
    const params = useParams();
    const ticketId = useMemo(() => Number(params?.ticketId), [params]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [form, setForm] = useState<TicketFormState>(EMPTY_FORM);

    useEffect(() => {
        async function loadTicket() {
            setLoading(true);
            setError(null);
            setSuccess(null);

            if (!Number.isInteger(ticketId) || ticketId <= 0) {
                setTicket(null);
                setError("Invalid ticket id.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/tickets/${ticketId}`, {
                    method: "GET",
                    cache: "no-store",
                });
                const body = await res.json().catch(() => null);

                if (!res.ok) {
                    throw new Error(body?.error || `Failed to load ticket (${res.status})`);
                }

                const loadedTicket = body?.ticket as Ticket;
                setTicket(loadedTicket);
                setForm({
                    teamLeader: loadedTicket.teamLeader || "",
                    teamMembers: loadedTicket.teamMembers || "",
                    completionDateTime: toDateInput(loadedTicket.completionDateTime),
                    status: loadedTicket.status,
                    subject: loadedTicket.subject || "",
                    breakDown: loadedTicket.breakDown || "",
                    resolution: loadedTicket.resolution || "",
                });
            } catch (err: any) {
                setTicket(null);
                setError(err?.message || "Failed to load ticket.");
            } finally {
                setLoading(false);
            }
        }

        loadTicket();
    }, [ticketId]);

    async function onSave(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!ticket) return;

        if (
            !form.teamLeader.trim() ||
            !form.teamMembers.trim() ||
            !form.completionDateTime.trim() ||
            !form.subject.trim() ||
            !form.breakDown.trim() ||
            !form.resolution.trim()
        ) {
            setError("All fields are required.");
            setSuccess(null);
            return;
        }

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`/api/tickets/${ticket.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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
                throw new Error(body?.error || `Failed to save ticket (${res.status})`);
            }

            const updatedTicket = body?.ticket as Ticket;
            setTicket(updatedTicket);
            setSuccess("Ticket saved successfully.");
        } catch (err: any) {
            setError(err?.message || "Failed to save ticket.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <PageWrapper>
            <SiteHeader
                title="Ticket Submission"
                subtitle="Edit and save ticket details."
            />

            <main className="mx-auto max-w-3xl space-y-4">
                <div>
                    <Link href="/tickets" className="text-sm font-medium text-indigo-600 underline">
                        Back to Tickets
                    </Link>
                </div>

                {loading ? (
                    <WebCard title="Ticket Submission">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading ticket...</p>
                    </WebCard>
                ) : !ticket ? (
                    <WebCard title="Ticket Submission">
                        <p className="text-sm text-red-600 dark:text-red-400">{error || "Ticket not found."}</p>
                    </WebCard>
                ) : (
                    <WebCard title={`Ticket #${ticket.id}`}>
                        <form className="mt-2 grid grid-cols-1 gap-4" aria-label="Ticket submission form" onSubmit={onSave}>
                            {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
                            {success ? <p className="text-sm text-emerald-600 dark:text-emerald-400">{success}</p> : null}

                            <div>
                                <label htmlFor="teamLeader" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Team Leader
                                </label>
                                <input
                                    id="teamLeader"
                                    name="teamLeader"
                                    type="text"
                                    required
                                    value={form.teamLeader}
                                    onChange={(e) => setForm((prev) => ({ ...prev, teamLeader: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="teamMembers" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Team Members
                                </label>
                                <textarea
                                    id="teamMembers"
                                    name="teamMembers"
                                    rows={3}
                                    required
                                    value={form.teamMembers}
                                    onChange={(e) => setForm((prev) => ({ ...prev, teamMembers: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="completionDateTime" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Completion Date
                                </label>
                                <input
                                    id="completionDateTime"
                                    name="completionDateTime"
                                    type="date"
                                    required
                                    value={form.completionDateTime}
                                    onChange={(e) => setForm((prev) => ({ ...prev, completionDateTime: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="status" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Status (Close / Open)
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    value={form.status}
                                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as TicketStatus }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                >
                                    <option value="close">Close</option>
                                    <option value="open">Open</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    value={form.subject}
                                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="breakDown" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Break Down
                                </label>
                                <textarea
                                    id="breakDown"
                                    name="breakDown"
                                    rows={4}
                                    required
                                    value={form.breakDown}
                                    onChange={(e) => setForm((prev) => ({ ...prev, breakDown: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="resolution" className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Resulotion
                                </label>
                                <textarea
                                    id="resolution"
                                    name="resolution"
                                    rows={4}
                                    required
                                    value={form.resolution}
                                    onChange={(e) => setForm((prev) => ({ ...prev, resolution: e.target.value }))}
                                    className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {saving ? "Saving..." : "Save Ticket"}
                                </button>
                            </div>
                        </form>
                    </WebCard>
                )}
            </main>
        </PageWrapper>
    );
}
