import { redirect } from 'next/navigation';
import AdminTicketEditor from '@/app/components/AdminTicketEditor';
import PageWrapper from '@/app/components/PageWrapper';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function AdminTicketEditPage({ params }: { params: Promise<{ ticketId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        redirect('/admin');
    }

    const { ticketId } = await params;
    const parsedTicketId = Number(ticketId);

    if (!Number.isInteger(parsedTicketId) || parsedTicketId <= 0) {
        redirect('/admin');
    }

    return (
        <PageWrapper>
            <AdminTicketEditor ticketId={parsedTicketId} />
        </PageWrapper>
    );
}
