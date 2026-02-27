import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { getQuiz } from '@/app/lib/adminDb';
import { listAttempts } from '@/app/lib/quizSessionDb';

export const runtime = 'nodejs';

function parseQuizId(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_: Request, ctx: { params: Promise<{ quizId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId } = await ctx.params;
    const id = parseQuizId(quizId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid quiz id.' }, { status: 400 });
    }

    const quiz = getQuiz(id);
    if (!quiz) {
        return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
    }

    const submissions = listAttempts()
        .filter((attempt) => attempt.quizId === id && attempt.isCompleted)
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

    return NextResponse.json({
        ok: true,
        quiz: {
            id: quiz.id,
            title: quiz.title,
            quizCode: quiz.quizCode,
        },
        submissionCount: submissions.length,
        submissions,
    });
}
