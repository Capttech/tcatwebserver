import { NextResponse } from 'next/server';
import { markAttemptCompleted } from '@/app/lib/quizSessionDb';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const attemptId = Number(body?.attemptId);
        const score = Number(body?.score);
        const totalQuestions = Number(body?.totalQuestions);

        if (!Number.isInteger(attemptId) || attemptId <= 0) {
            return NextResponse.json({ ok: false, error: 'Valid attemptId is required.' }, { status: 400 });
        }

        if (!Number.isInteger(score) || score < 0) {
            return NextResponse.json({ ok: false, error: 'Valid score is required.' }, { status: 400 });
        }

        if (!Number.isInteger(totalQuestions) || totalQuestions <= 0) {
            return NextResponse.json({ ok: false, error: 'Valid totalQuestions is required.' }, { status: 400 });
        }

        if (score > totalQuestions) {
            return NextResponse.json({ ok: false, error: 'Score cannot exceed total questions.' }, { status: 400 });
        }

        const attempt = markAttemptCompleted(attemptId, { score, totalQuestions });
        if (!attempt) {
            return NextResponse.json({ ok: false, error: 'Attempt not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, attempt });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
