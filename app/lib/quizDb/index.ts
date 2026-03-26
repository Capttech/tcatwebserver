import mysql from "@/lib/db";

export async function listQuizzes() {
    const [rows] = await mysql.query(
        "SELECT * FROM quizzes ORDER BY updatedAt DESC"
    );
    return rows;
}

export async function getQuiz(id: number) {
    const [rows] = await mysql.query(
        "SELECT * FROM quizzes WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function getQuizByCode(quizCode: string) {
    const [rows] = await mysql.query(
        "SELECT * FROM quizzes WHERE quizCode = ?",
        [quizCode]
    );
    return rows[0] || null;
}

export async function createQuiz({ title, description, quizCode, durationMinutes }: { title: string; description?: string; quizCode: string; durationMinutes?: number }) {
    const now = new Date();
    const [_, meta] = await mysql.query(
        "INSERT INTO quizzes (title, description, quizCode, durationMinutes, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description || '', quizCode, durationMinutes || 30, now, now]
    );
    // @ts-ignore
    return getQuiz(meta.insertId);
}

export async function updateQuiz(id: number, { title, description, quizCode, durationMinutes }: { title?: string; description?: string; quizCode?: string; durationMinutes?: number }) {
    const fields = [];
    const values = [];
    if (title !== undefined) {
        fields.push("title = ?");
        values.push(title);
    }
    if (description !== undefined) {
        fields.push("description = ?");
        values.push(description);
    }
    if (quizCode !== undefined) {
        fields.push("quizCode = ?");
        values.push(quizCode);
    }
    if (durationMinutes !== undefined) {
        fields.push("durationMinutes = ?");
        values.push(durationMinutes);
    }
    if (fields.length === 0) return null;
    fields.push("updatedAt = ?");
    values.push(new Date());
    values.push(id);
    await mysql.query(
        `UPDATE quizzes SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return getQuiz(id);
}

export async function deleteQuiz(id: number) {
    const [_, meta] = await mysql.query(
        "DELETE FROM quizzes WHERE id = ?",
        [id]
    );
    // @ts-ignore
    return meta.affectedRows > 0;
}
