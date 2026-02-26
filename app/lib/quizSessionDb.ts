import fs from 'node:fs';
import path from 'node:path';

type QuizAttemptRow = {
    id: number;
    quizId: number;
    quizCode: string;
    participantName: string;
    participantKey: string;
    startedAt: string;
    expiresAt: string;
    isCompleted: boolean;
    completedAt: string | null;
    score: number | null;
    totalQuestions: number | null;
    createdAt: string;
    updatedAt: string;
};

type QuizSessionDbShape = {
    counters: {
        attemptId: number;
    };
    attempts: QuizAttemptRow[];
};

export type QuizAttempt = QuizAttemptRow;

const DB_FILE = path.join(process.cwd(), 'data', 'quiz-session-db.json');

function initialDb(): QuizSessionDbShape {
    return {
        counters: {
            attemptId: 0,
        },
        attempts: [],
    };
}

function ensureDbFile() {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDb(), null, 2), 'utf8');
    }
}

function readDb(): QuizSessionDbShape {
    ensureDbFile();
    const raw = fs.readFileSync(DB_FILE, 'utf8');

    try {
        const parsed = JSON.parse(raw) as Partial<QuizSessionDbShape>;
        let shouldWrite = false;

        if (!parsed.counters || typeof parsed.counters !== 'object') {
            parsed.counters = { attemptId: 0 };
            shouldWrite = true;
        }

        if (typeof parsed.counters.attemptId !== 'number') {
            parsed.counters.attemptId = 0;
            shouldWrite = true;
        }

        if (!Array.isArray(parsed.attempts)) {
            parsed.attempts = [];
            shouldWrite = true;
        }

        const db = parsed as QuizSessionDbShape;
        db.attempts = db.attempts.map((attempt) => {
            const nextAttempt = { ...attempt } as QuizAttemptRow;

            if (typeof (attempt as any).isCompleted !== 'boolean') {
                nextAttempt.isCompleted = false;
                shouldWrite = true;
            }

            if (typeof (attempt as any).completedAt === 'string') {
                nextAttempt.completedAt = (attempt as any).completedAt;
            } else {
                nextAttempt.completedAt = null;
                if ((attempt as any).completedAt !== null) {
                    shouldWrite = true;
                }
            }

            if (typeof (attempt as any).score === 'number') {
                nextAttempt.score = (attempt as any).score;
            } else {
                nextAttempt.score = null;
                if ((attempt as any).score !== null) {
                    shouldWrite = true;
                }
            }

            if (typeof (attempt as any).totalQuestions === 'number') {
                nextAttempt.totalQuestions = (attempt as any).totalQuestions;
            } else {
                nextAttempt.totalQuestions = null;
                if ((attempt as any).totalQuestions !== null) {
                    shouldWrite = true;
                }
            }

            return nextAttempt;
        });

        if (shouldWrite) {
            writeDb(db);
        }

        return db;
    } catch {
        const db = initialDb();
        writeDb(db);
        return db;
    }
}

function writeDb(db: QuizSessionDbShape) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

export function normalizeParticipantName(value: string) {
    return value.trim();
}

export function participantKey(value: string) {
    return normalizeParticipantName(value).toLowerCase();
}

export function isAttemptExpired(attempt: QuizAttempt) {
    return Date.now() >= new Date(attempt.expiresAt).getTime();
}

export function getLatestAttempt(quizId: number, participantName: string) {
    const db = readDb();
    const key = participantKey(participantName);

    return db.attempts
        .filter((attempt) => attempt.quizId === quizId && attempt.participantKey === key)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] || null;
}

export function createAttempt(input: {
    quizId: number;
    quizCode: string;
    participantName: string;
    durationMinutes: number;
}) {
    const db = readDb();
    const now = new Date();
    const startedAt = now.toISOString();
    const expiresAt = new Date(now.getTime() + input.durationMinutes * 60_000).toISOString();

    const attempt: QuizAttemptRow = {
        id: ++db.counters.attemptId,
        quizId: input.quizId,
        quizCode: input.quizCode,
        participantName: normalizeParticipantName(input.participantName),
        participantKey: participantKey(input.participantName),
        startedAt,
        expiresAt,
        isCompleted: false,
        completedAt: null,
        score: null,
        totalQuestions: null,
        createdAt: startedAt,
        updatedAt: startedAt,
    };

    db.attempts.push(attempt);
    writeDb(db);
    return attempt;
}

export function markAttemptCompleted(attemptId: number, input: { score: number; totalQuestions: number }) {
    const db = readDb();
    const attempt = db.attempts.find((entry) => entry.id === attemptId);
    if (!attempt) return null;

    const now = new Date().toISOString();
    attempt.isCompleted = true;
    attempt.completedAt = now;
    attempt.score = input.score;
    attempt.totalQuestions = input.totalQuestions;
    attempt.updatedAt = now;

    writeDb(db);
    return attempt;
}
