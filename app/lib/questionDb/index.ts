import mysql from "@/lib/db";

export async function listQuestions(quizId: number) {
    const [rows] = await mysql.query(
        "SELECT * FROM questions WHERE quizId = ? ORDER BY createdAt ASC",
        [quizId]
    );
    return rows;
}

export async function getQuestion(questionId: number) {
    const [rows] = await mysql.query(
        "SELECT * FROM questions WHERE id = ?",
        [questionId]
    );
    return rows[0] || null;
}

export async function createQuestion(quizId: number, { prompt, options, correctOption }: { prompt: string; options: [string, string, string, string]; correctOption: number }) {
    const now = new Date();
    const [_, meta] = await mysql.query(
        "INSERT INTO questions (quizId, prompt, options, correctOption, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
        [quizId, prompt, JSON.stringify(options), correctOption, now, now]
    );
    // @ts-ignore
    return getQuestion(meta.insertId);
}

export async function updateQuestion(questionId: number, { prompt, options, correctOption }: { prompt?: string; options?: [string, string, string, string]; correctOption?: number }) {
    const fields = [];
    const values = [];
    if (prompt !== undefined) {
        fields.push("prompt = ?");
        values.push(prompt);
    }
    if (options !== undefined) {
        fields.push("options = ?");
        values.push(JSON.stringify(options));
    }
    if (correctOption !== undefined) {
        fields.push("correctOption = ?");
        values.push(correctOption);
    }
    if (fields.length === 0) return null;
    fields.push("updatedAt = ?");
    values.push(new Date());
    values.push(questionId);
    await mysql.query(
        `UPDATE questions SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return getQuestion(questionId);
}

export async function deleteQuestion(questionId: number) {
    const [_, meta] = await mysql.query(
        "DELETE FROM questions WHERE id = ?",
        [questionId]
    );
    // @ts-ignore
    return meta.affectedRows > 0;
}
