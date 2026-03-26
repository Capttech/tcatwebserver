
import mysql from "@/lib/db";

export type QuizAttempt = {
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


export function normalizeParticipantName(value: string) {
    return value.trim();
}

export function participantKey(value: string) {
    return normalizeParticipantName(value).toLowerCase();
}

export function isAttemptExpired(attempt: QuizAttempt) {
    return Date.now() >= new Date(attempt.expiresAt).getTime();
}

export async function getLatestAttempt(quizId: number, participantName: string) {
    const key = participantKey(participantName);
    const [rows] = await mysql.query(
        "SELECT * FROM quiz_attempts WHERE quizId = ? AND participantKey = ? ORDER BY createdAt DESC LIMIT 1",
        [quizId, key]
    );
    return rows[0] || null;
}

export async function listAttempts() {
    const [rows] = await mysql.query(
        "SELECT * FROM quiz_attempts ORDER BY updatedAt DESC"
    );
    return rows;
}

export async function createAttempt(input: {
    quizId: number;
    quizCode: string;
    participantName: string;
    durationMinutes: number;
}) {
    const now = new Date();
    const startedAt = now.toISOString();
    const expiresAt = new Date(now.getTime() + input.durationMinutes * 60_000).toISOString();
    const [_, meta] = await mysql.query(
        `INSERT INTO quiz_attempts (quizId, quizCode, participantName, participantKey, startedAt, expiresAt, isCompleted, completedAt, score, totalQuestions, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, false, NULL, NULL, NULL, ?, ?)` ,
        [
            input.quizId,
            input.quizCode,
            normalizeParticipantName(input.participantName),
            participantKey(input.participantName),
            startedAt,
            expiresAt,
            startedAt,
            startedAt,
        ]
    );
    // @ts-ignore
    return getAttempt(meta.insertId);
}

export async function getAttempt(id: number) {
    const [rows] = await mysql.query(
        "SELECT * FROM quiz_attempts WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function markAttemptCompleted(attemptId: number, input: { score: number; totalQuestions: number }) {
    const now = new Date().toISOString();
    await mysql.query(
        `UPDATE quiz_attempts SET isCompleted = true, completedAt = ?, score = ?, totalQuestions = ?, updatedAt = ? WHERE id = ?`,
        [now, input.score, input.totalQuestions, now, attemptId]
    );
    return getAttempt(attemptId);
}
