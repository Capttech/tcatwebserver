import { NextResponse } from 'next/server';
import {
    createQuestionBankQuestion,
    listQuestionBank,
} from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

function normalizeOptions(options: unknown): [string, string, string, string] | null {
    if (!Array.isArray(options) || options.length !== 4) return null;
    const cleaned = options.map((value) => String(value ?? '').trim());
    if (cleaned.some((value) => !value)) return null;
    return cleaned as [string, string, string, string];
}

export async function GET() {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, questions: listQuestionBank() });
}

export async function POST(req: Request) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
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

        const question = createQuestionBankQuestion({ prompt, options, correctOption });
        return NextResponse.json({ ok: true, question }, { status: 201 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
