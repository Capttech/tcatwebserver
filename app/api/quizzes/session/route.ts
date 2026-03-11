import { NextResponse } from 'next/server';
import { getQuizByCode } from '@/app/lib/adminDb';
import {
    createAttempt,
    getLatestAttempt,
    isAttemptExpired,
    normalizeParticipantName,
} from '@/app/lib/quizSessionDb';

export const runtime = 'nodejs';

function sanitizeQuiz(quiz: any, includeQuestions: boolean) {
    const base = {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        quizCode: quiz.quizCode,
        durationMinutes: quiz.durationMinutes,
    };

    if (!includeQuestions) {
        return base;
    }

    return {
        ...base,
        questions: quiz.questions,
    };
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const quizCode = String(body?.quizCode || '').trim().toUpperCase();
        const participantName = normalizeParticipantName(String(body?.participantName || ''));
        const start = body?.start === true;

        if (!quizCode) {
            return NextResponse.json({ ok: false, error: 'Quiz code is required.' }, { status: 400 });
        }

        if (!participantName) {
            return NextResponse.json({ ok: false, error: 'Name is required.' }, { status: 400 });
        }

        const quiz = getQuizByCode(quizCode);
        if (!quiz) {
            return NextResponse.json({ ok: false, error: 'Invalid quiz code.' }, { status: 404 });
        }

        const latestAttempt = getLatestAttempt(quiz.id, participantName);
        const expired = latestAttempt ? isAttemptExpired(latestAttempt) : false;

        if (!start) {
            if (latestAttempt?.isCompleted) {
                return NextResponse.json({
                    ok: true,
                    status: 'completed',
                    attempt: latestAttempt,
                    quiz: sanitizeQuiz(quiz, false),
                });
            }

            if (latestAttempt && expired) {
                return NextResponse.json({
                    ok: true,
                    status: 'expired',
                    attempt: latestAttempt,
                    quiz: sanitizeQuiz(quiz, false),
                });
            }

            if (latestAttempt) {
                return NextResponse.json({
                    ok: true,
                    status: 'active',
                    attempt: latestAttempt,
                    quiz: sanitizeQuiz(quiz, true),
                });
            }

            return NextResponse.json({
                ok: true,
                status: 'ready',
                quiz: sanitizeQuiz(quiz, false),
            });
        }

        if (latestAttempt?.isCompleted) {
            return NextResponse.json({
                ok: true,
                status: 'completed',
                attempt: latestAttempt,
                quiz: sanitizeQuiz(quiz, false),
            });
        }

        if (latestAttempt && expired) {
            return NextResponse.json({
                ok: true,
                status: 'expired',
                attempt: latestAttempt,
                quiz: sanitizeQuiz(quiz, false),
            });
        }

        if (latestAttempt) {
            return NextResponse.json({
                ok: true,
                status: 'active',
                attempt: latestAttempt,
                quiz: sanitizeQuiz(quiz, true),
            });
        }

        const durationMinutes = Number.isInteger(quiz.durationMinutes) && quiz.durationMinutes > 0 ? quiz.durationMinutes : 30;
        const attempt = createAttempt({
            quizId: quiz.id,
            quizCode: quiz.quizCode,
            participantName,
            durationMinutes,
        });

        return NextResponse.json({
            ok: true,
            status: 'active',
            attempt,
            quiz: sanitizeQuiz(quiz, true),
        });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
