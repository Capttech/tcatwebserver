import { NextResponse } from 'next/server';
import { createTicket, listTickets, TicketStatus } from '@/app/lib/ticketDb';

export const runtime = 'nodejs';

function parseStatus(value: unknown): TicketStatus | null {
    const text = String(value || '').toLowerCase();
    if (text === 'open' || text === 'close') return text;
    return null;
}

export async function GET() {
    return NextResponse.json({ ok: true, tickets: listTickets() });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const teamLeader = String(body?.teamLeader || '').trim();
        const teamMembers = String(body?.teamMembers || '').trim();
        const completionDateTime = String(body?.completionDateTime || '').trim();
        const status = parseStatus(body?.status);
        const subject = String(body?.subject || '').trim();
        const breakDown = String(body?.breakDown || '').trim();
        const resolution = String(body?.resolution || '').trim();

        if (!completionDateTime || !status || !subject || !breakDown) {
            return NextResponse.json({ ok: false, error: 'Completion Date, Subject, and Break Down are required.' }, { status: 400 });
        }

        const ticket = createTicket({
            teamLeader,
            teamMembers,
            completionDateTime,
            status,
            subject,
            breakDown,
            resolution,
        });

        return NextResponse.json({ ok: true, ticket }, { status: 201 });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}
