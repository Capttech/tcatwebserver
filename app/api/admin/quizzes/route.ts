import { NextResponse } from 'next/server';
import { createQuiz, listQuizzes } from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

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

        if (!title) {
            return NextResponse.json({ ok: false, error: 'Quiz title is required.' }, { status: 400 });
        }

        const quiz = createQuiz({ title, description });
        return NextResponse.json({ ok: true, quiz }, { status: 201 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
