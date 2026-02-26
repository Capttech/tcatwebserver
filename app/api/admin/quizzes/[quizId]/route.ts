import { NextResponse } from 'next/server';
import { deleteQuiz, getQuiz, updateQuiz } from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

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

        if (title !== undefined && !title.trim()) {
            return NextResponse.json({ ok: false, error: 'Quiz title cannot be empty.' }, { status: 400 });
        }

        const quiz = updateQuiz(id, { title, description });
        if (!quiz) {
            return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, quiz });
    } catch {
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
