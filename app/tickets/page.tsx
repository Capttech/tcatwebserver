import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("../components/TicketForm"), { ssr: false });

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-zinc-50">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold">Tickets (Sign-Out)</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Use this form to record when students leave campus to fix equipment or perform work off-site.</p>

        <div className="mt-6">
          <TicketForm />
        </div>
      </div>
    </div>
  );
}
