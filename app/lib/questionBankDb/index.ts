import mysql from "@/lib/db";
import { MatchPair, QuestionBankQuestion, Questions } from "./types";

export async function listQuestionBank() {
    const [rows] = await mysql.query(`SELECT * FROM question_bank ORDER BY updatedAt DESC`);
    const response: Questions = rows as Questions;

    for (const row of response) {
        if (row.type === 'match') {
            const [pairs] = await mysql.query(`SELECT * FROM match_pairs WHERE questionBankId = ?`, [row.id]);
            const pairResponse: MatchPair = pairs as MatchPair;
            row.matchPairs = pairResponse;
        }
    }
    return response;
}

export async function getQuestionBankQuestion(id: number) {
    const [rows] = await mysql.query(`SELECT * FROM question_bank WHERE id = ?`, [id]);
    const response: QuestionBankQuestion = rows as QuestionBankQuestion;

    const question = response[0] || null;
    if (question && question.type === 'match') {
        const [pairs] = await mysql.query(`SELECT * FROM match_pairs WHERE questionBankId = ?`, [id]);
        const pairResponse: MatchPair = pairs as MatchPair;
        question.matchPairs = pairResponse;
    }

    return question;
}

export async function createQuestionBankQuestion(input: any) {
    // const now = new Date();
    // const [_, meta] = await mysql.query(
    //     `INSERT INTO question_bank (type, prompt, options, correctOption, correctOptions, imageId, createdAt, updatedAt)
    //      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //         input.type,
    //         input.prompt,
    //         input.options ? JSON.stringify(input.options) : null,
    //         input.correctOption ?? null,
    //         input.correctOptions ? JSON.stringify(input.correctOptions) : null,
    //         input.imageId ?? null,
    //         now,
    //         now
    //     ]
    // );
    // const questionId = meta.insertId;
    // // If matchPairs provided, insert them
    // if (input.type === 'match' && Array.isArray(input.matchPairs)) {
    //     for (const pair of input.matchPairs) {
    //         await mysql.query(
    //             `INSERT INTO match_pairs (questionBankId, title, imageId, createdAt) VALUES (?, ?, ?, ?)`,
    //             [questionId, pair.title, pair.imageId, now]
    //         );
    //     }
    // }
    // return getQuestionBankQuestion(questionId);
}

// input: { type, prompt, options, correctOption, correctOptions, imageId, matchPairs }
export async function updateQuestionBankQuestion(id: number, input: any) {
    // const fields = [];
    // const values = [];
    // if (input.type !== undefined) {
    //     fields.push("type = ?");
    //     values.push(input.type);
    // }
    // if (input.prompt !== undefined) {
    //     fields.push("prompt = ?");
    //     values.push(input.prompt);
    // }
    // if (input.options !== undefined) {
    //     fields.push("options = ?");
    //     values.push(JSON.stringify(input.options));
    // }
    // if (input.correctOption !== undefined) {
    //     fields.push("correctOption = ?");
    //     values.push(input.correctOption);
    // }
    // if (input.correctOptions !== undefined) {
    //     fields.push("correctOptions = ?");
    //     values.push(JSON.stringify(input.correctOptions));
    // }
    // if (input.imageId !== undefined) {
    //     fields.push("imageId = ?");
    //     values.push(input.imageId);
    // }
    // if (fields.length === 0) return null;
    // fields.push("updatedAt = ?");
    // values.push(new Date());
    // values.push(id);
    // await mysql.query(
    //     `UPDATE question_bank SET ${fields.join(", ")} WHERE id = ?`,
    //     values
    // );
    // // For matchPairs, delete old and insert new if provided
    // if (input.type === 'match' && Array.isArray(input.matchPairs)) {
    //     await mysql.query(`DELETE FROM match_pairs WHERE questionBankId = ?`, [id]);
    //     const now = new Date();
    //     for (const pair of input.matchPairs) {
    //         await mysql.query(
    //             `INSERT INTO match_pairs (questionBankId, title, imageId, createdAt) VALUES (?, ?, ?, ?)`,
    //             [id, pair.title, pair.imageId, now]
    //         );
    //     }
    // }
    // return getQuestionBankQuestion(id);
}

export async function deleteQuestionBankQuestion(id: number) {
    // const [_, meta] = await mysql.query(
    //     "DELETE FROM question_bank WHERE id = ?",
    //     [id]
    // );
    // // meta.affectedRows is available as the second element (ResultSetHeader)
    // // @ts-ignore
    // return meta.affectedRows > 0;
}
