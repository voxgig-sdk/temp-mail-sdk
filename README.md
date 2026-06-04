# TempMail SDK

Generate disposable email addresses on demand for privacy, testing, and one-time signups

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Temp Mail API

Temp Mail API is a disposable-email service published on the [Juhe API](https://hub.juheapi.com/) hub. It lets developers programmatically create throwaway inboxes so users can send and receive messages without exposing a personal address.

What you can do with the API:
- Create a temporary email address via `GET /temp-mail/v1/create`
- Use the generated address for verification flows, privacy-sensitive signups, or automated testing

Operational notes (per the [freepublicapis.com listing](https://freepublicapis.com/temp-mail-api)):
- Authentication is by API key, passed as an `apikey` URL parameter
- CORS is disabled, so calls should be made server-side
- The catalogue reports 100% reliability and around 1s average response time over the last 30 days
- Rate limits and licence terms are not published on the listing

## Try it

**TypeScript**
```bash
npm install temp-mail
```

**Python**
```bash
pip install temp-mail-sdk
```

**PHP**
```bash
composer require voxgig/temp-mail-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/temp-mail-sdk/go
```

**Ruby**
```bash
gem install temp-mail-sdk
```

**Lua**
```bash
luarocks install temp-mail-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TempMailSDK } from 'temp-mail'

const client = new TempMailSDK({})

// List all emails
const emails = await client.Email().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o temp-mail-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "temp-mail": {
      "command": "/abs/path/to/temp-mail-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Email** | A disposable email address resource; created via `GET /temp-mail/v1/create` and used as the throwaway identity for sending or receiving messages. | `/get-emails` |
| **Mailbox** | The inbox associated with a generated temporary email address, used to access messages delivered to that address. | `/create` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from tempmail_sdk import TempMailSDK

client = TempMailSDK({})

# List all emails
emails, err = client.Email(None).list(None, None)
```

### PHP

```php
<?php
require_once 'tempmail_sdk.php';

$client = new TempMailSDK([]);

// List all emails
[$emails, $err] = $client->Email(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/temp-mail-sdk/go"

client := sdk.NewTempMailSDK(map[string]any{})

// List all emails
emails, err := client.Email(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "TempMail_sdk"

client = TempMailSDK.new({})

# List all emails
emails, err = client.Email(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("temp-mail_sdk")

local client = sdk.new({})

-- List all emails
local emails, err = client:Email(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TempMailSDK.test()
const result = await client.Email().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TempMailSDK.test(None, None)
result, err = client.Email(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TempMailSDK::test(null, null);
[$result, $err] = $client->Email(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Email(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TempMailSDK.test(nil, nil)
result, err = client.Email(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Email(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Temp Mail API

- Upstream: [https://hub.juheapi.com/temp-mail/v1](https://hub.juheapi.com/temp-mail/v1)

---

Generated from the Temp Mail API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
