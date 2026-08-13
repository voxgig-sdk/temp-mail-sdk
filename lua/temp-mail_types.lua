-- Typed models for the TempMail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Email
---@field attachments table
---@field body string
---@field from string
---@field id string
---@field received_at? number
---@field subject string

---@class EmailListMatch
---@field attachments? table
---@field body? string
---@field from? string
---@field id? string
---@field received_at? number
---@field subject? string

---@class Mailbox
---@field domain? string
---@field email? string
---@field expires_at? number
---@field id? string

---@class MailboxCreateData
---@field domain? string
---@field email? string
---@field expires_at? number
---@field id? string

local M = {}

return M
