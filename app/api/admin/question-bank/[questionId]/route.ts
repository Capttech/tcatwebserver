import { NextResponse } from 'next/server';
import {
    deleteQuestionBankQuestion,
    updateQuestionBankQuestion,
} from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

function parsePositiveInt(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeOptions(options: unknown): [string, string, string, string] | null {
    if (!Array.isArray(options) || options.length !== 4) return null;
    const cleaned = options.map((value) => String(value ?? '').trim());
    if (cleaned.some((value) => !value)) return null;
    return cleaned as [string, string, string, string];
}

export async function PUT(req: Request, ctx: { params: Promise<{ questionId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId } = await ctx.params;
    const parsedQuestionId = parsePositiveInt(questionId);
    if (!parsedQuestionId) {
        return NextResponse.json({ ok: false, error: 'Invalid question id.' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const payload: {
            prompt?: string;
            options?: [string, string, string, string];
            correctOption?: number;
        } = {};

        if (typeof body?.prompt === 'string') {
            const prompt = body.prompt.trim();
            if (!prompt) {
                return NextResponse.json({ ok: false, error: 'Question prompt cannot be empty.' }, { status: 400 });
            }
            payload.prompt = prompt;
        }

        if (body?.options !== undefined) {
            const options = normalizeOptions(body.options);
            if (!options) {
                return NextResponse.json({ ok: false, error: 'Exactly 4 non-empty options are required.' }, { status: 400 });
            }
            payload.options = options;
        }

        if (body?.correctOption !== undefined) {
            const correctOption = Number(body.correctOption);
            if (!Number.isInteger(correctOption) || correctOption < 0 || correctOption > 3) {
                return NextResponse.json({ ok: false, error: 'correctOption must be between 0 and 3.' }, { status: 400 });
            }
            payload.correctOption = correctOption;
        }

        if (Object.keys(payload).length === 0) {
            return NextResponse.json({ ok: false, error: 'No fields provided for update.' }, { status: 400 });
        }

        const question = updateQuestionBankQuestion(parsedQuestionId, payload);
        if (!question) {
            return NextResponse.json({ ok: false, error: 'Question not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, question });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ questionId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId } = await ctx.params;
    const parsedQuestionId = parsePositiveInt(questionId);
    if (!parsedQuestionId) {
        return NextResponse.json({ ok: false, error: 'Invalid question id.' }, { status: 400 });
    }

    const deleted = deleteQuestionBankQuestion(parsedQuestionId);
    if (!deleted) {
        return NextResponse.json({ ok: false, error: 'Question not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}
