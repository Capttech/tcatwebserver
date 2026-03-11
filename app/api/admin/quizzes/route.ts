import { NextResponse } from 'next/server';
import { createQuiz, listQuizzes } from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

const QUIZ_CODE_PATTERN = /^[A-Z0-9_-]{4,32}$/;

export async function GET() {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, quizzes: listQuizzes() });
}

export async function POST(req: Request) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const title = String(body?.title || '').trim();
        const description = String(body?.description || '').trim();
        const quizCode = String(body?.quizCode || '').trim().toUpperCase();
        const durationMinutes = Number(body?.durationMinutes);

        if (!title) {
            return NextResponse.json({ ok: false, error: 'Quiz title is required.' }, { status: 400 });
        }

        if (!quizCode) {
            return NextResponse.json({ ok: false, error: 'Quiz code is required.' }, { status: 400 });
        }

        if (!QUIZ_CODE_PATTERN.test(quizCode)) {
            return NextResponse.json({ ok: false, error: 'Quiz code must be 4-32 characters using letters, numbers, underscores, or dashes.' }, { status: 400 });
        }

        if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
            return NextResponse.json({ ok: false, error: 'Quiz duration must be a whole number greater than 0.' }, { status: 400 });
        }

        const quiz = createQuiz({ title, description, quizCode, durationMinutes });
        return NextResponse.json({ ok: true, quiz }, { status: 201 });
    } catch (error: any) {
        if (error?.message === 'Quiz code already exists.') {
            return NextResponse.json({ ok: false, error: error.message }, { status: 409 });
        }
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
