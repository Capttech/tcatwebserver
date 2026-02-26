import fs from 'node:fs';
import path from 'node:path';

export type TicketStatus = 'open' | 'close';

export type Ticket = {
    id: number;
    teamLeader: string;
    teamMembers: string;
    creationDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
    createdAt: string;
    updatedAt: string;
};

type TicketDbShape = {
    counters: {
        ticketId: number;
    };
    tickets: Array<Ticket & { completionDateTime?: string }>;
};

const TICKET_DB_FILE = path.join(process.cwd(), 'data', 'tickets-db.json');

function initialTicketDb(): TicketDbShape {
    return {
        counters: {
            ticketId: 0,
        },
        tickets: [],
    };
}

function ensureTicketDbFile() {
    fs.mkdirSync(path.dirname(TICKET_DB_FILE), { recursive: true });
    if (!fs.existsSync(TICKET_DB_FILE)) {
        fs.writeFileSync(TICKET_DB_FILE, JSON.stringify(initialTicketDb(), null, 2), 'utf8');
    }
}

function readTicketDb(): TicketDbShape {
    ensureTicketDbFile();
    const raw = fs.readFileSync(TICKET_DB_FILE, 'utf8');
    try {
        return JSON.parse(raw) as TicketDbShape;
    } catch {
        const db = initialTicketDb();
        fs.writeFileSync(TICKET_DB_FILE, JSON.stringify(db, null, 2), 'utf8');
        return db;
    }
}

function normalizeTicketDb(db: TicketDbShape) {
    let changed = false;

    for (const ticket of db.tickets) {
        if (!ticket.creationDateTime && typeof ticket.completionDateTime === 'string') {
            ticket.creationDateTime = ticket.completionDateTime;
            changed = true;
        }

        if ('completionDateTime' in ticket) {
            delete ticket.completionDateTime;
            changed = true;
        }
    }

    if (changed) {
        writeTicketDb(db);
    }

    return db;
}

function writeTicketDb(db: TicketDbShape) {
    fs.writeFileSync(TICKET_DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

export function listTickets() {
    const db = normalizeTicketDb(readTicketDb());
    return db.tickets.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getTicket(ticketId: number) {
    const db = normalizeTicketDb(readTicketDb());
    return db.tickets.find((ticket) => ticket.id === ticketId) || null;
}

export function createTicket(input: {
    teamLeader: string;
    teamMembers: string;
    creationDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
}) {
    const db = normalizeTicketDb(readTicketDb());
    const now = new Date().toISOString();
    const ticket: Ticket = {
        id: ++db.counters.ticketId,
        teamLeader: input.teamLeader.trim(),
        teamMembers: input.teamMembers.trim(),
        creationDateTime: input.creationDateTime,
        status: input.status,
        subject: input.subject.trim(),
        breakDown: input.breakDown.trim(),
        resolution: input.resolution.trim(),
        createdAt: now,
        updatedAt: now,
    };

    db.tickets.push(ticket);
    writeTicketDb(db);
    return ticket;
}

export function updateTicket(
    ticketId: number,
    input: {
        teamLeader?: string;
        teamMembers?: string;
        creationDateTime?: string;
        status?: TicketStatus;
        subject?: string;
        breakDown?: string;
        resolution?: string;
    }
) {
    const db = normalizeTicketDb(readTicketDb());
    const ticket = db.tickets.find((row) => row.id === ticketId);
    if (!ticket) return null;

    if (typeof input.teamLeader === 'string') ticket.teamLeader = input.teamLeader.trim();
    if (typeof input.teamMembers === 'string') ticket.teamMembers = input.teamMembers.trim();
    if (typeof input.creationDateTime === 'string') ticket.creationDateTime = input.creationDateTime;
    if (input.status === 'open' || input.status === 'close') ticket.status = input.status;
    if (typeof input.subject === 'string') ticket.subject = input.subject.trim();
    if (typeof input.breakDown === 'string') ticket.breakDown = input.breakDown.trim();
    if (typeof input.resolution === 'string') ticket.resolution = input.resolution.trim();

    ticket.updatedAt = new Date().toISOString();
    writeTicketDb(db);
    return ticket;
}

export function deleteTicket(ticketId: number) {
    const db = normalizeTicketDb(readTicketDb());
    const index = db.tickets.findIndex((ticket) => ticket.id === ticketId);
    if (index === -1) return false;

    db.tickets.splice(index, 1);
    writeTicketDb(db);
    return true;
}
