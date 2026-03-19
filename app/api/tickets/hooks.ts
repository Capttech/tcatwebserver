import mysql from "@/lib/db";
import { Ticket, TicketStatus } from "./types";

export async function listTickets(): Promise<Ticket[]> {
    const [rows] = await mysql.query("SELECT * FROM tickets ORDER BY createdAt DESC");
    return rows as Ticket[];
}

export function parseUpdateStatus(value: unknown): TicketStatus | null {
    const text = String(value || '').toLowerCase();
    if (text === 'open' || text === 'closed') return text as TicketStatus;
    return null;
}

export function parseTicketId(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

export function parseUniqueStatus(value: unknown): TicketStatus | undefined {
    if (value === undefined) return undefined;
    const text = String(value || '').toLowerCase();
    if (text === 'open' || text === 'close') return text as TicketStatus;
    return undefined;
}

export async function createTicket(input: {
    subject: string;
    breakDown: string;
    resolution?: string;
    teamLeader: string;
    teamMembers: string;
    status?: TicketStatus;
    creationDate: string;
    creationDateTime?: string;
}): Promise<Ticket> {
    const now = new Date();
    const [_, meta] = await mysql.query(
        `INSERT INTO tickets (subject, breakDown, resolution, teamLeader, teamMembers, status, creationDate, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
        [
            input.subject,
            input.breakDown,
            input.resolution || null,
            input.teamLeader,
            input.teamMembers,
            input.status || TicketStatus.OPEN,
            input.creationDate,
            now,
        ]
    );
    // @ts-ignore
    return getTicket(meta.insertId);
}

export async function getTicket(id: number): Promise<Ticket | null> {
    const [rows] = await mysql.query(
        "SELECT * FROM tickets WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function updateTicket(id: number, input: Partial<Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Ticket | null> {
    const fields = [];
    const values = [];
    for (const key of Object.keys(input)) {
        fields.push(`${key} = ?`);
        // @ts-ignore
        values.push(input[key]);
    }
    if (fields.length === 0) return getTicket(id);
    fields.push("updatedAt = ?");
    values.push(new Date());
    values.push(id);
    await mysql.query(
        `UPDATE tickets SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return getTicket(id);
}