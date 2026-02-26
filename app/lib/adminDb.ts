import fs from 'node:fs';
import path from 'node:path';

type QuizRow = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
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
    };
    quizzes: QuizRow[];
    questions: QuestionRow[];
};

const DB_FILE = path.join(process.cwd(), 'data', 'admin-db.json');

function initialDb(): DbShape {
    return {
        counters: {
            quizId: 0,
            questionId: 0,
        },
        quizzes: [],
        questions: [],
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
        return JSON.parse(raw) as DbShape;
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
    createdAt: string;
    updatedAt: string;
    questions: AdminQuestion[];
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

export function createQuiz(input: { title: string; description?: string }) {
    const db = readDb();
    const now = new Date().toISOString();
    const quiz: QuizRow = {
        id: ++db.counters.quizId,
        title: input.title.trim(),
        description: (input.description || '').trim(),
        createdAt: now,
        updatedAt: now,
    };
    db.quizzes.push(quiz);
    writeDb(db);
    return withQuestions(db, quiz);
}

export function updateQuiz(quizId: number, input: { title?: string; description?: string }) {
    const db = readDb();
    const quiz = db.quizzes.find((q) => q.id === quizId);
    if (!quiz) return null;

    if (typeof input.title === 'string') {
        quiz.title = input.title.trim();
    }
    if (typeof input.description === 'string') {
        quiz.description = input.description.trim();
    }
    quiz.updatedAt = new Date().toISOString();

    writeDb(db);
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
