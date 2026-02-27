import { redirect } from 'next/navigation';
import PageWrapper from '@/app/components/PageWrapper';
import AdminQuizSubmissions from '@/app/components/AdminQuizSubmissions';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function AdminQuizSubmissionsPage({ params }: { params: Promise<{ quizId: string }> }) {
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
            <AdminQuizSubmissions quizId={parsedQuizId} />
        </PageWrapper>
    );
}
