// Typed models for the TempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Email is the typed data model for the email entity.
type Email struct {
	Attachment []any `json:"attachment"`
	Body string `json:"body"`
	From string `json:"from"`
	Id string `json:"id"`
	ReceivedAt *int `json:"received_at,omitempty"`
	Subject string `json:"subject"`
}

// EmailListMatch is the typed request payload for Email.ListTyped.
type EmailListMatch struct {
	Attachment *[]any `json:"attachment,omitempty"`
	Body *string `json:"body,omitempty"`
	From *string `json:"from,omitempty"`
	Id *string `json:"id,omitempty"`
	ReceivedAt *int `json:"received_at,omitempty"`
	Subject *string `json:"subject,omitempty"`
}

// Mailbox is the typed data model for the mailbox entity.
type Mailbox struct {
	Code *string `json:"code,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Msg *string `json:"msg,omitempty"`
}

// MailboxCreateData is the typed request payload for Mailbox.CreateTyped.
type MailboxCreateData struct {
	Code *string `json:"code,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Msg *string `json:"msg,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
