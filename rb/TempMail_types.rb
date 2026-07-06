# frozen_string_literal: true

# Typed models for the TempMail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Email entity data model.
#
# @!attribute [rw] attachment
#   @return [Array]
#
# @!attribute [rw] body
#   @return [String]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] received_at
#   @return [Integer, nil]
#
# @!attribute [rw] subject
#   @return [String]
Email = Struct.new(
  :attachment,
  :body,
  :from,
  :id,
  :received_at,
  :subject,
  keyword_init: true
)

# Request payload for Email#list.
#
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [Integer, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
EmailListMatch = Struct.new(
  :attachment,
  :body,
  :from,
  :id,
  :received_at,
  :subject,
  keyword_init: true
)

# Mailbox entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] msg
#   @return [String, nil]
Mailbox = Struct.new(
  :code,
  :data,
  :domain,
  :msg,
  keyword_init: true
)

# Request payload for Mailbox#create.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] msg
#   @return [String, nil]
MailboxCreateData = Struct.new(
  :code,
  :data,
  :domain,
  :msg,
  keyword_init: true
)

