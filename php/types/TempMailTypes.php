<?php
declare(strict_types=1);

// Typed models for the TempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Email entity data model. */
class Email
{
    public array $attachments;
    public string $body;
    public string $from;
    public string $id;
    public ?int $received_at = null;
    public string $subject;
}

/** Request payload for Email#list. */
class EmailListMatch
{
    public ?array $attachments = null;
    public ?string $body = null;
    public ?string $from = null;
    public ?string $id = null;
    public ?int $received_at = null;
    public ?string $subject = null;
}

/** Mailbox entity data model. */
class Mailbox
{
    public ?string $domain = null;
    public ?string $email = null;
    public ?int $expires_at = null;
    public ?string $id = null;
}

/** Request payload for Mailbox#create. */
class MailboxCreateData
{
    public ?string $domain = null;
    public ?string $email = null;
    public ?int $expires_at = null;
    public ?string $id = null;
}

