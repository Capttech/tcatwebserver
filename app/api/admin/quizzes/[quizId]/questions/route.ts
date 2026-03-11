import { NextResponse } from 'next/server';
import { createQuestion, getQuiz } from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

function parseQuizId(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeOptions(options: unknown): [string, string, string, string] | null {
    if (!Array.isArray(options) || options.length !== 4) return null;
    const cleaned = options.map((value) => String(value ?? '').trim());
    if (cleaned.some((value) => !value)) return null;
    return cleaned as [string, string, string, string];
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

    return NextResponse.json({ ok: true, questions: quiz.questions });
}

export async function POST(req: Request, ctx: { params: Promise<{ quizId: string }> }) {
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
        const prompt = String(body?.prompt || '').trim();
        const options = normalizeOptions(body?.options);
        const correctOption = Number(body?.correctOption);

        if (!prompt) {
            return NextResponse.json({ ok: false, error: 'Question prompt is required.' }, { status: 400 });
        }
        if (!options) {
            return NextResponse.json({ ok: false, error: 'Exactly 4 non-empty options are required.' }, { status: 400 });
        }
        if (!Number.isInteger(correctOption) || correctOption < 0 || correctOption > 3) {
            return NextResponse.json({ ok: false, error: 'correctOption must be between 0 and 3.' }, { status: 400 });
        }

        const question = createQuestion(id, { prompt, options, correctOption });
        if (!question) {
            return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, question }, { status: 201 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
