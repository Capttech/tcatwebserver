import { NextResponse } from 'next/server';
import {
    createQuestion,
    getQuestionBankQuestion,
    getQuiz,
} from '@/app/lib/adminDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

function parsePositiveInt(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export async function POST(req: Request, ctx: { params: Promise<{ quizId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId } = await ctx.params;
    const parsedQuizId = parsePositiveInt(quizId);
    if (!parsedQuizId) {
        return NextResponse.json({ ok: false, error: 'Invalid quiz id.' }, { status: 400 });
    }

    const quiz = getQuiz(parsedQuizId);
    if (!quiz) {
        return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
    }

    try {
        const body = await req.json();
        const bankQuestionId = Number(body?.bankQuestionId);

        if (!Number.isInteger(bankQuestionId) || bankQuestionId <= 0) {
            return NextResponse.json({ ok: false, error: 'bankQuestionId must be a positive integer.' }, { status: 400 });
        }

        const bankQuestion = getQuestionBankQuestion(bankQuestionId);
        if (!bankQuestion) {
            return NextResponse.json({ ok: false, error: 'Question bank entry not found.' }, { status: 404 });
        }

        const question = createQuestion(parsedQuizId, {
            prompt: bankQuestion.prompt,
            options: bankQuestion.options,
            correctOption: bankQuestion.correctOption,
        });

        if (!question) {
            return NextResponse.json({ ok: false, error: 'Quiz not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, question }, { status: 201 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
