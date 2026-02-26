import fs from 'node:fs';
import path from 'node:path';

type QuizRow = {
    id: number;
    title: string;
    description: string;
    durationMinutes: number;
    createdAt: string;
    updatedAt: string;
    quizCode: string;
};

type QuestionRow = {
    id: number;
    quizId: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

type DbShape = {
    counters: {
        quizId: number;
        questionId: number;
        bankQuestionId: number;
    };
    quizzes: QuizRow[];
    questions: QuestionRow[];
    questionBank: BankQuestionRow[];
};

type BankQuestionRow = {
    id: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

const DB_FILE = path.join(process.cwd(), 'data', 'admin-db.json');

function normalizeQuizCode(code: string) {
    return code.trim().toUpperCase();
}

function buildDefaultQuizCode(quizId: number) {
    return `QUIZ-${quizId}`;
}

function initialDb(): DbShape {
    return {
        counters: {
            quizId: 0,
            questionId: 0,
            bankQuestionId: 0,
        },
        quizzes: [],
        questions: [],
        questionBank: [],
    };
}

function ensureDbFile() {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDb(), null, 2), 'utf8');
    }
}

function readDb(): DbShape {
    ensureDbFile();
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    try {
        const parsed = JSON.parse(raw) as Partial<DbShape>;
        let shouldWrite = false;

        if (!parsed.counters || typeof parsed.counters !== 'object') {
            parsed.counters = { quizId: 0, questionId: 0, bankQuestionId: 0 };
            shouldWrite = true;
        }

        if (typeof parsed.counters.quizId !== 'number') {
            parsed.counters.quizId = 0;
            shouldWrite = true;
        }
        if (typeof parsed.counters.questionId !== 'number') {
            parsed.counters.questionId = 0;
            shouldWrite = true;
        }
        if (typeof parsed.counters.bankQuestionId !== 'number') {
            parsed.counters.bankQuestionId = 0;
            shouldWrite = true;
        }

        if (!Array.isArray(parsed.quizzes)) {
            parsed.quizzes = [];
            shouldWrite = true;
        }
        if (!Array.isArray(parsed.questions)) {
            parsed.questions = [];
            shouldWrite = true;
        }
        if (!Array.isArray(parsed.questionBank)) {
            parsed.questionBank = [];
            shouldWrite = true;
        }

        const db = parsed as DbShape;

        const usedCodes = new Set<string>();
        db.quizzes = db.quizzes.map((quiz) => {
            const nextQuiz = { ...quiz } as QuizRow;
            const rawQuizCode = typeof (quiz as any).quizCode === 'string' ? (quiz as any).quizCode : '';
            let nextCode = normalizeQuizCode(rawQuizCode);
            const rawDuration = Number((quiz as any).durationMinutes);
            const durationMinutes = Number.isInteger(rawDuration) && rawDuration > 0 ? rawDuration : 30;

            if (!nextCode || usedCodes.has(nextCode)) {
                nextCode = buildDefaultQuizCode(nextQuiz.id);
                while (usedCodes.has(nextCode)) {
                    nextCode = `${nextCode}-A`;
                }
                shouldWrite = true;
            } else if (rawQuizCode !== nextCode) {
                shouldWrite = true;
            }

            nextQuiz.quizCode = nextCode;
            if ((quiz as any).durationMinutes !== durationMinutes) {
                shouldWrite = true;
            }
            nextQuiz.durationMinutes = durationMinutes;
            usedCodes.add(nextCode);
            return nextQuiz;
        });

        if (shouldWrite) {
            writeDb(db);
        }

        return db;
    } catch {
        const db = initialDb();
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
        return db;
    }
}

function writeDb(db: DbShape) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

export type AdminQuestion = {
    id: number;
    quizId: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

export type AdminQuiz = {
    id: number;
    title: string;
    description: string;
    durationMinutes: number;
    createdAt: string;
    updatedAt: string;
    quizCode: string;
    questions: AdminQuestion[];
};

export type AdminBankQuestion = {
    id: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

function withQuestions(db: DbShape, quiz: QuizRow): AdminQuiz {
    return {
        ...quiz,
        questions: db.questions
            .filter((q) => q.quizId === quiz.id)
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    };
}

export function listQuizzes() {
    const db = readDb();
    return db.quizzes
        .slice()
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((quiz) => withQuestions(db, quiz));
}

export function getQuiz(quizId: number) {
    const db = readDb();
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;
    return withQuestions(db, quiz);
}

export function createQuiz(input: { title: string; description?: string; quizCode: string; durationMinutes?: number }) {
    const db = readDb();
    const now = new Date().toISOString();
    const quizCode = normalizeQuizCode(input.quizCode);
    const durationMinutes = Number.isInteger(input.durationMinutes) && Number(input.durationMinutes) > 0
        ? Number(input.durationMinutes)
        : 30;

    if (db.quizzes.some((quiz) => quiz.quizCode === quizCode)) {
        throw new Error('Quiz code already exists.');
    }

    const quiz: QuizRow = {
        id: ++db.counters.quizId,
        title: input.title.trim(),
        description: (input.description || '').trim(),
        durationMinutes,
        createdAt: now,
        updatedAt: now,
        quizCode,
    };
    db.quizzes.push(quiz);
    writeDb(db);
    return withQuestions(db, quiz);
}

export function updateQuiz(quizId: number, input: { title?: string; description?: string; quizCode?: string; durationMinutes?: number }) {
    const db = readDb();
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;

    if (typeof input.title === 'string') {
        quiz.title = input.title.trim();
    }
    if (typeof input.description === 'string') {
        quiz.description = input.description.trim();
    }
    if (typeof input.quizCode === 'string') {
        const nextQuizCode = normalizeQuizCode(input.quizCode);
        const existing = db.quizzes.find((q) => q.id !== quizId && q.quizCode === nextQuizCode);
        if (existing) {
            throw new Error('Quiz code already exists.');
        }
        quiz.quizCode = nextQuizCode;
    }
    if (typeof input.durationMinutes === 'number') {
        quiz.durationMinutes = input.durationMinutes;
    }
    quiz.updatedAt = new Date().toISOString();

    writeDb(db);
    return withQuestions(db, quiz);
}

export function getQuizByCode(quizCode: string) {
    const db = readDb();
    const normalizedCode = normalizeQuizCode(quizCode);
    const quiz = db.quizzes.find((q) => q.quizCode === normalizedCode);
    if (!quiz) return null;
    return withQuestions(db, quiz);
}

export function deleteQuiz(quizId: number) {
    const db = readDb();
    const quizIndex = db.quizzes.findIndex((q) => q.id === quizId);
    if (quizIndex === -1) return false;

    db.quizzes.splice(quizIndex, 1);
    db.questions = db.questions.filter((q) => q.quizId !== quizId);
    writeDb(db);
    return true;
}

export function createQuestion(
    quizId: number,
    input: { prompt: string; options: [string, string, string, string]; correctOption: number }
) {
    const db = readDb();
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;

    const now = new Date().toISOString();
    const question: QuestionRow = {
        id: ++db.counters.questionId,
        quizId,
        prompt: input.prompt.trim(),
        options: input.options.map((o) => o.trim()) as [string, string, string, string],
        correctOption: input.correctOption,
        createdAt: now,
        updatedAt: now,
    };

    db.questions.push(question);
    quiz.updatedAt = now;
    writeDb(db);

    return question;
}

export function updateQuestion(
    quizId: number,
    questionId: number,
    input: { prompt?: string; options?: [string, string, string, string]; correctOption?: number }
) {
    const db = readDb();
    const question = db.questions.find((q) => q.id === questionId && q.quizId === quizId);
    if (!question) return null;

    if (typeof input.prompt === 'string') {
        question.prompt = input.prompt.trim();
    }
    if (input.options) {
        question.options = input.options.map((o) => o.trim()) as [string, string, string, string];
    }
    if (typeof input.correctOption === 'number') {
        question.correctOption = input.correctOption;
    }

    question.updatedAt = new Date().toISOString();
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (quiz) {
        quiz.updatedAt = question.updatedAt;
    }

    writeDb(db);
    return question;
}

export function deleteQuestion(quizId: number, questionId: number) {
    const db = readDb();
    const index = db.questions.findIndex((q) => q.id === questionId && q.quizId === quizId);
    if (index === -1) return false;

    db.questions.splice(index, 1);
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (quiz) {
        quiz.updatedAt = new Date().toISOString();
    }

    writeDb(db);
    return true;
}

export function listQuestionBank() {
    const db = readDb();
    return db.questionBank
        .slice()
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getQuestionBankQuestion(questionId: number) {
    const db = readDb();
    return db.questionBank.find((q) => q.id === questionId) || null;
}

export function createQuestionBankQuestion(input: {
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
}) {
    const db = readDb();
    const now = new Date().toISOString();
    const question: BankQuestionRow = {
        id: ++db.counters.bankQuestionId,
        prompt: input.prompt.trim(),
        options: input.options.map((o) => o.trim()) as [string, string, string, string],
        correctOption: input.correctOption,
        createdAt: now,
        updatedAt: now,
    };

    db.questionBank.push(question);
    writeDb(db);
    return question;
}

export function updateQuestionBankQuestion(
    questionId: number,
    input: { prompt?: string; options?: [string, string, string, string]; correctOption?: number }
) {
    const db = readDb();
    const question = db.questionBank.find((q) => q.id === questionId);
    if (!question) return null;

    if (typeof input.prompt === 'string') {
        question.prompt = input.prompt.trim();
    }
    if (input.options) {
        question.options = input.options.map((o) => o.trim()) as [string, string, string, string];
    }
    if (typeof input.correctOption === 'number') {
        question.correctOption = input.correctOption;
    }
    question.updatedAt = new Date().toISOString();

    writeDb(db);
    return question;
}

export function deleteQuestionBankQuestion(questionId: number) {
    const db = readDb();
    const index = db.questionBank.findIndex((q) => q.id === questionId);
    if (index === -1) return false;

    db.questionBank.splice(index, 1);
    writeDb(db);
    return true;
}
