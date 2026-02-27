import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { listQuizzes } from '@/app/lib/adminDb';
import { listAttempts } from '@/app/lib/quizSessionDb';

export const runtime = 'nodejs';

export async function GET() {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const quizzes = listQuizzes();
    const completedAttempts = listAttempts().filter((attempt) => attempt.isCompleted);

    const grades = quizzes.map((quiz) => {
        const submissions = completedAttempts
            .filter((attempt) => attempt.quizId === quiz.id)
            .map((attempt) => ({
                attemptId: attempt.id,
                participantName: attempt.participantName,
                score: attempt.score,
                totalQuestions: attempt.totalQuestions,
                startedAt: attempt.startedAt,
                completedAt: attempt.completedAt,
                updatedAt: attempt.updatedAt,
            }))
            .sort((a, b) => String(b.completedAt || b.updatedAt).localeCompare(String(a.completedAt || a.updatedAt)));

        return {
            quizId: quiz.id,
            title: quiz.title,
            quizCode: quiz.quizCode,
            submissionCount: submissions.length,
            submissions,
        };
    });

    return NextResponse.json({ ok: true, quizzes: grades });
}
