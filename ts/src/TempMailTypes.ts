// Typed models for the TempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Email {
  attachments: any[]
  body: string
  from: string
  id: string
  received_at?: number
  subject: string
}

export interface EmailListMatch {
  attachments?: any[]
  body?: string
  from?: string
  id?: string
  received_at?: number
  subject?: string
}

export interface Mailbox {
  domain?: string
  email?: string
  expires_at?: number
  id?: string
}

export interface MailboxCreateData {
  domain?: string
  email?: string
  expires_at?: number
  id?: string
}

