export type Questions = {
    id: number;
    type: string;
    options: string;
    correctOption: string;
    correctOptions?: string;
    prompt?: string;
    imageId: number;
    createdAt: Date;
    updatedAt: Date;
    matchPairs?: MatchPair;
}[];

export type MatchPair = {
    id: number;
    questionnBankId: number;
    title: string;
    imageId: number;
    createdAt: Date;
}[]

export type QuestionBankQuestion = {
    id: number;
    type: string;
    prmopt: string;
    optiosn: JSON;
    correctOption: string;
    correctOptions?: JSON;
    imageId: number;
    createdAt: Date;
    updatedAt: Date;
    matchPairs?: MatchPair;
}[]