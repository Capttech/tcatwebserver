import { NextResponse } from 'next/server';
import { getQuizByCode } from '@/app/lib/quizDb/index';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    return NextResponse.json({ ok: false, error: 'Unavailable' }, { status: 503 });

    // try {
    //     const body = await req.json();
    //     const quizCode = String(body?.quizCode || '').trim().toUpperCase();

    //     if (!quizCode) {
    //         return NextResponse.json({ ok: false, error: 'Quiz code is required.' }, { status: 400 });
    //     }

    //     const quiz = getQuizByCode(quizCode);
    //     if (!quiz) {
    //         return NextResponse.json({ ok: false, error: 'Invalid quiz code.' }, { status: 404 });
    //     }

    //     return NextResponse.json({ ok: true, quiz });
    // } catch {
    //     return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    // }
}
