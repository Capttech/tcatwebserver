export enum TicketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
}

export type Ticket = {
    id: number;
    subject: string;
    breakDown: string;
    resolution: string | null;
    teamLeader: string;
    teamMembers: string;
    status: TicketStatus;
    creationDate: string;
    createdAt: string;
    updatedAt: string;
};
