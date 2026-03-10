import mysql from "@/lib/db";

export async function listGrades(quizId: number) {
    const [rows] = await mysql.query(
        "SELECT * FROM grades WHERE quizId = ? ORDER BY createdAt DESC",
        [quizId]
    );
    return rows;
}

export async function createGrade(quizId: number, { studentName, score }: { studentName: string; score: number }) {
    const now = new Date();
    const [_, meta] = await mysql.query(
        "INSERT INTO grades (quizId, studentName, score, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [quizId, studentName, score, now, now]
    );
    // @ts-ignore
    return meta.insertId;
}
