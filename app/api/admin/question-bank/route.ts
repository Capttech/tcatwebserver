
import { NextResponse } from 'next/server';
import { createQuestionBankQuestion, listQuestionBank } from '@/app/lib/questionBankDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

function normalizeOptions(options: unknown): string[] | null {
    if (!Array.isArray(options) || options.length !== 4) return null;
    const cleaned = options.map((value) => String(value ?? '').trim());
    if (cleaned.some((value) => !value)) return null;
    return cleaned;
}

export async function GET() {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });


    const questions = await listQuestionBank();
    console.log(questions)

    return NextResponse.json({ ok: false, error: 'Unavailable' }, { status: 503 });
    // return NextResponse.json({ ok: true, questions });
}

export async function POST(req: Request) {
    const isAuth = await isAdminAuthenticated()
    if (!isAuth) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

    return NextResponse.json({ ok: false, error: 'Unavailable' }, { status: 503 });

    // try {
    //     const body = await req.json();
    //     const type = (body?.type || 'standard').trim ? String(body?.type || 'standard').trim() : 'standard';
    //     const prompt = String(body?.prompt || '').trim();
    //     const options = normalizeOptions(body?.options);
    //     const correctOption = body?.correctOption;
    //     const correctOptions = body?.correctOptions;
    //     const matchPairs = body?.matchPairs;
    //     const imageId = body?.imageId;

    //     if (!prompt) {
    //         return NextResponse.json({ ok: false, error: 'Question prompt is required.' }, { status: 400 });
    //     }
    //     if (type === 'standard') {
    //         if (!options) {
    //             return NextResponse.json({ ok: false, error: 'Exactly 4 non-empty options are required.' }, { status: 400 });
    //         }
    //         if (!Number.isInteger(correctOption) || correctOption < 0 || correctOption > 3) {
    //             return NextResponse.json({ ok: false, error: 'correctOption must be between 0 and 3.' }, { status: 400 });
    //         }
    //     } else if (type === 'multiple') {
    //         if (!options) {
    //             return NextResponse.json({ ok: false, error: 'Exactly 4 non-empty options are required.' }, { status: 400 });
    //         }
    //         if (!Array.isArray(correctOptions) || correctOptions.length === 0 || correctOptions.some((idx) => !Number.isInteger(idx) || idx < 0 || idx > 3)) {
    //             return NextResponse.json({ ok: false, error: 'correctOptions must be an array of indices (0-3).' }, { status: 400 });
    //         }
    //     } else if (type === 'match') {
    //         if (!Array.isArray(matchPairs) || matchPairs.length === 0) {
    //             return NextResponse.json({ ok: false, error: 'At least one match pair is required.' }, { status: 400 });
    //         }
    //     }

    //     const question = await createQuestionBankQuestion({
    //         type,
    //         prompt,
    //         options,
    //         correctOption,
    //         correctOptions,
    //         matchPairs,
    //         imageId,
    //     });
    //     return NextResponse.json({ ok: true, question }, { status: 201 });
    // } catch (e) {
    //     return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    // }
}
