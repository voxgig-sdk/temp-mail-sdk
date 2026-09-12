export interface Email {
    attachments: any[];
    body: string;
    from: string;
    id: string;
    received_at?: number;
    subject: string;
}
export interface EmailListMatch {
    id: string;
}
export interface Mailbox {
    domain?: string;
    email?: string;
    expires_at?: number;
    id?: string;
}
export interface MailboxCreateData {
    domain?: string;
    email?: string;
    expires_at?: number;
    id?: string;
}
