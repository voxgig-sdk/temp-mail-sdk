// Typed models for the TempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Email {
  attachment: any[]
  body: string
  from: string
  id: string
  received_at?: number
  subject: string
}

export type EmailListMatch = Partial<Email>

export interface Mailbox {
  code?: string
  data?: Record<string, any>
  domain?: string
  msg?: string
}

export type MailboxCreateData = Partial<Mailbox>

