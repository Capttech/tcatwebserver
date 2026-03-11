import Link from "next/link";
import PageWrapper from "../components/PageWrapper";
import SiteHeader from "../components/SiteHeader";
import { listTickets } from "../lib/ticketDb";

function formatCreatedDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return date.toLocaleDateString();
}

function getStatusClasses(status: "open" | "close") {
    return status === "open"
        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
}

function getStatusLabel(status: "open" | "close") {
    return status === "open" ? "Open" : "Close";
}

export default function TicketsPage() {
    const tickets = listTickets();

    return (
        <PageWrapper>
            <SiteHeader
                title="Tickets"
                subtitle="View all tickets by status and open one to edit details."
            />

            <main className="mx-auto max-w-4xl space-y-6">
                {tickets.length === 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">No tickets found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {tickets.map((ticket) => (
                            <Link
                                key={ticket.id}
                                href={`/ticket-submission/${ticket.id}`}
                                className="block rounded-md border border-zinc-300 bg-white/70 px-4 py-3 text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Status:{" "}
                                    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${getStatusClasses(ticket.status)}`}>
                                        {getStatusLabel(ticket.status)}
                                    </span>
                                </div>
                                <div className="mt-1 font-semibold">Subject: {ticket.subject}</div>
                                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Created: {formatCreatedDate(ticket.createdAt)}</div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </PageWrapper>
    );
}
