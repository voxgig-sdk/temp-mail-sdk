package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TempMail",
			"slug": "temp-mail",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://hub.juheapi.com/temp-mail/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"email": map[string]any{},
				"mailbox": map[string]any{},
			},
		},
		"entity": map[string]any{
			"email": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"req": true,
						"short": "List of attachments in the email",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"req": true,
						"short": "Body content of the email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"req": true,
						"short": "Email address of the sender",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "received_at",
						"short": "Unix timestamp when the email was received",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "subject",
						"req": true,
						"short": "Subject line of the email",
						"type": "`$STRING`",
					},
				},
				"name": "email",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "mailbox_12345",
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/get-emails",
								"parts": []any{
									"get-emails",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mailbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"short": "Optional domain for the temporary email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"short": "Generated temporary email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"short": "Unix timestamp when the mailbox expires",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the mailbox",
						"type": "`$STRING`",
					},
				},
				"name": "mailbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/create",
								"parts": []any{
									"create",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
