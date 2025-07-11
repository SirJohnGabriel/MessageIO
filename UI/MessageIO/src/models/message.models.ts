export interface Message {
    id: number;
    contactId: number;
    text: string;
    timestamp: Date;
    sentByMe: boolean;
}