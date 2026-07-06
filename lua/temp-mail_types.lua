-- Typed models for the TempMail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Email
---@field attachment table
---@field body string
---@field from string
---@field id string
---@field received_at? number
---@field subject string

---@class EmailListMatch
---@field attachment? table
---@field body? string
---@field from? string
---@field id? string
---@field received_at? number
---@field subject? string

---@class Mailbox
---@field code? string
---@field data? table
---@field domain? string
---@field msg? string

---@class MailboxCreateData
---@field code? string
---@field data? table
---@field domain? string
---@field msg? string

local M = {}

return M
