import mysql from "@/lib/db";

export async function listQuestionBank() {
    const [rows] = await mysql.query(
        "SELECT id, prompt, options, correctOption, createdAt, updatedAt FROM question_bank ORDER BY updatedAt DESC"
    );
    return rows;
}

export async function getQuestionBankQuestion(id: number) {
    const [rows] = await mysql.query(
        "SELECT id, prompt, options, correctOption, createdAt, updatedAt FROM question_bank WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function createQuestionBankQuestion({ prompt, options, correctOption }: { prompt: string; options: [string, string, string, string]; correctOption: number; }) {
    const now = new Date();
    const [_, meta] = await mysql.query(
        "INSERT INTO question_bank (prompt, options, correctOption, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [prompt, JSON.stringify(options), correctOption, now, now]
    );
    // meta.insertId is available as the second element (ResultSetHeader)
    // @ts-ignore
    return getQuestionBankQuestion(meta.insertId);
}

export async function updateQuestionBankQuestion(id: number, { prompt, options, correctOption }: { prompt?: string; options?: [string, string, string, string]; correctOption?: number; }) {
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
    values.push(id);
    await mysql.query(
        `UPDATE question_bank SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return getQuestionBankQuestion(id);
}

export async function deleteQuestionBankQuestion(id: number) {
    const [_, meta] = await mysql.query(
        "DELETE FROM question_bank WHERE id = ?",
        [id]
    );
    // meta.affectedRows is available as the second element (ResultSetHeader)
    // @ts-ignore
    return meta.affectedRows > 0;
}
