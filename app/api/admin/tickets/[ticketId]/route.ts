import { NextResponse } from 'next/server';
import { deleteTicket, getTicket, TicketStatus, updateTicket } from '@/app/lib/ticketDb';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';

export const runtime = 'nodejs';

function parseTicketId(value: string) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

function parseStatus(value: unknown): TicketStatus | undefined {
    if (value === undefined) return undefined;
    const text = String(value || '').toLowerCase();
    if (text === 'open' || text === 'close') return text;
    return undefined;
}

export async function GET(_: Request, ctx: { params: Promise<{ ticketId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { ticketId } = await ctx.params;
    const id = parseTicketId(ticketId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid ticket id.' }, { status: 400 });
    }

    const ticket = getTicket(id);
    if (!ticket) {
        return NextResponse.json({ ok: false, error: 'Ticket not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, ticket });
}

export async function PUT(req: Request, ctx: { params: Promise<{ ticketId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { ticketId } = await ctx.params;
    const id = parseTicketId(ticketId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid ticket id.' }, { status: 400 });
    }

    try {
        const body = await req.json();

        const teamLeader = typeof body?.teamLeader === 'string' ? body.teamLeader : '';
        const teamMembers = typeof body?.teamMembers === 'string' ? body.teamMembers : '';
        const creationDateTime = typeof body?.creationDateTime === 'string'
            ? body.creationDateTime
            : typeof body?.completionDateTime === 'string'
                ? body.completionDateTime
                : undefined;
        const status = parseStatus(body?.status);
        const subject = typeof body?.subject === 'string' ? body.subject : undefined;
        const breakDown = typeof body?.breakDown === 'string' ? body.breakDown : undefined;
        const resolution = typeof body?.resolution === 'string' ? body.resolution : '';

        if (subject !== undefined && !subject.trim()) {
            return NextResponse.json({ ok: false, error: 'Subject cannot be empty.' }, { status: 400 });
        }
        if (breakDown !== undefined && !breakDown.trim()) {
            return NextResponse.json({ ok: false, error: 'Break Down cannot be empty.' }, { status: 400 });
        }
        if (creationDateTime !== undefined && !creationDateTime.trim()) {
            return NextResponse.json({ ok: false, error: 'Creation Date cannot be empty.' }, { status: 400 });
        }

        const ticket = updateTicket(id, {
            teamLeader,
            teamMembers,
            creationDateTime,
            status,
            subject,
            breakDown,
            resolution,
        });

        if (!ticket) {
            return NextResponse.json({ ok: false, error: 'Ticket not found.' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, ticket });
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }
}

export async function DELETE(_: Request, ctx: { params: Promise<{ ticketId: string }> }) {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { ticketId } = await ctx.params;
    const id = parseTicketId(ticketId);
    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid ticket id.' }, { status: 400 });
    }

    const deleted = deleteTicket(id);
    if (!deleted) {
        return NextResponse.json({ ok: false, error: 'Ticket not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
}
