export type MatchPair = { title: string; imageId: number | null };

export type TicketStatus = "open" | "close";

export type Ticket = {
    id: number;
    teamLeader: string;
    teamMembers: string;
    completionDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
    createdAt: string;
    updatedAt: string;
};

export type TicketFormState = {
    teamLeader: string;
    teamMembers: string;
    completionDateTime: string;
    status: TicketStatus;
    subject: string;
    breakDown: string;
    resolution: string;
};

export type AdminQuestion = {
    id: number;
    quizId: number;
    prompt: string;
    options: string[];
    correctOptions: number[];
    matchPairs: MatchPair[];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

export type AdminQuiz = {
    id: number;
    title: string;
    description: string;
    quizCode: string;
    durationMinutes: number;
    createdAt: string;
    updatedAt: string;
    questions: AdminQuestion[];
};

export type AdminBankQuestion = {
    id: number;
    prompt: string;
    options: [string, string, string, string];
    correctOption: number;
    createdAt: string;
    updatedAt: string;
};

export type AdminQuizGrade = {
    quizId: number;
    title: string;
    quizCode: string;
    submissionCount: number;
};

export type QuestionType = "standard" | "image" | "match" | "multiple";

export type QuestionFormState = {
    type: QuestionType;
    prompt: string;
    options: string[];
    correctOption: number;
    correctOptions: number[];
    matchPairs: MatchPair[];
};