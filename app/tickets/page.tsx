import TicketForm from "../components/TicketForm";
import PageWrapper from "../components/PageWrapper";

export default function TicketsPage() {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-semibold">Tickets (Sign-Out)</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Use this form to record when students leave campus to fix equipment or perform work off-site.</p>

      <div className="mt-6">
        <TicketForm />
      </div>
    </PageWrapper >
  );
}
