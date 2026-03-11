import { redirect } from 'next/navigation';
import AdminQuizEditor from '@/app/components/AdminQuizEditor';
import PageWrapper from '@/app/components/PageWrapper';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function AdminQuizQuickEditPage({ params }: { params: Promise<{ quizId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        redirect('/admin');
    }

    const { quizId } = await params;
    const parsedQuizId = Number(quizId);

    if (!Number.isInteger(parsedQuizId) || parsedQuizId <= 0) {
        redirect('/admin');
    }

    return (
        <PageWrapper>
            <AdminQuizEditor quizId={parsedQuizId} />
        </PageWrapper>
    );
}
