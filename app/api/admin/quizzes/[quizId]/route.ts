import { NextResponse } from 'next/server';
import { deleteQuiz, getQuiz, updateQuiz } from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

const QUIZ_CODE_PATTERN = /^[A-Z0-9_-]{4,32}$/;

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

    return NextResponse.json({ ok: true, quiz });
}

export async function PUT(req: Request, ctx: { params: Promise<{ quizId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId } = await ctx.params;
    const id = parseQuizId(quizId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid quiz id.' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const title = typeof body?.title === 'string' ? body.title : undefined;
        const description = typeof body?.description === 'string' ? body.description : undefined;
        const quizCode = typeof body?.quizCode === 'string' ? body.quizCode.trim().toUpperCase() : undefined;
        const durationMinutes = body?.durationMinutes !== undefined ? Number(body.durationMinutes) : undefined;

        if (title !== undefined && !title.trim()) {
            return NextResponse.json({ ok: false, error: 'Quiz title cannot be empty.' }, { status: 400 });
        }

        if (quizCode !== undefined && !quizCode) {
            return NextResponse.json({ ok: false, error: 'Quiz code cannot be empty.' }, { status: 400 });
        }

        if (quizCode !== undefined && !QUIZ_CODE_PATTERN.test(quizCode)) {
            return NextResponse.json({ ok: false, error: 'Quiz code must be 4-32 characters using letters, numbers, underscores, or dashes.' }, { status: 400 });
        }

        if (durationMinutes !== undefined && (!Number.isInteger(durationMinutes) || durationMinutes <= 0)) {
            return NextResponse.json({ ok: false, error: 'Quiz duration must be a whole number greater than 0.' }, { status: 400 });
        }

        const quiz = updateQuiz(id, { title, description, quizCode, durationMinutes });
        if (!quiz) {
            return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, quiz });
    } catch (error: any) {
        if (error?.message === 'Quiz code already exists.') {
            return NextResponse.json({ ok: false, error: error.message }, { status: 409 });
        }
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ quizId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId } = await ctx.params;
    const id = parseQuizId(quizId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid quiz id.' }, { status: 400 });
    }

    const deleted = deleteQuiz(id);
    if (!deleted) {
        return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}
