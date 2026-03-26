import { NextResponse } from 'next/server';
import { getTicket, parseTicketId, parseUniqueStatus, updateTicket } from '../hooks';

export async function GET(_: Request, ctx: { params: Promise<{ ticketId: string }> }) {
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
    const { ticketId } = await ctx.params;
    const id = parseTicketId(ticketId);

    if (!id) {
        return NextResponse.json({ ok: false, error: 'Invalid ticket id.' }, { status: 400 });
    }

    try {
        const body = await req.json();

        const teamLeader = typeof body?.teamLeader === 'string' ? body.teamLeader : undefined;
        const teamMembers = typeof body?.teamMembers === 'string' ? body.teamMembers : undefined;
        const creationDateTime = typeof body?.creationDateTime === 'string'
            ? body.creationDateTime
            : typeof body?.completionDateTime === 'string'
                ? body.completionDateTime
                : undefined;
        const status = parseUniqueStatus(body?.status);
        const subject = typeof body?.subject === 'string' ? body.subject : undefined;
        const breakDown = typeof body?.breakDown === 'string' ? body.breakDown : undefined;
        const resolution = typeof body?.resolution === 'string' ? body.resolution : undefined;

        if (teamLeader !== undefined && !teamLeader.trim()) {
            return NextResponse.json({ ok: false, error: 'Team Leader cannot be empty.' }, { status: 400 });
        }

        if (teamMembers !== undefined && !teamMembers.trim()) {
            return NextResponse.json({ ok: false, error: 'Team Members cannot be empty.' }, { status: 400 });
        }

        if (subject !== undefined && !subject.trim()) {
            return NextResponse.json({ ok: false, error: 'Subject cannot be empty.' }, { status: 400 });
        }

        if (breakDown !== undefined && !breakDown.trim()) {
            return NextResponse.json({ ok: false, error: 'Break Down cannot be empty.' }, { status: 400 });
        }

        if (resolution !== undefined && !resolution.trim()) {
            return NextResponse.json({ ok: false, error: 'Resolution cannot be empty.' }, { status: 400 });
        }

        if (creationDateTime !== undefined && !creationDateTime.trim()) {
            return NextResponse.json({ ok: false, error: 'Creation Date cannot be empty.' }, { status: 400 });
        }

        const ticket = updateTicket(id, {
            teamLeader,
            teamMembers,
            creationDate: creationDateTime,
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
