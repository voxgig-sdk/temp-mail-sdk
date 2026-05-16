package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/temp-mail-sdk"
	"github.com/voxgig-sdk/temp-mail-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestMailboxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Mailbox(nil)
		if ent == nil {
			t.Fatal("expected non-nil MailboxEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := mailboxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "mailbox." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TEMPMAIL_TEST_MAILBOX_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		mailboxRef01Ent := client.Mailbox(nil)
		mailboxRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "mailbox"}, setup.data), "mailbox_ref01"))

		mailboxRef01DataResult, err := mailboxRef01Ent.Create(mailboxRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		mailboxRef01Data = core.ToMapAny(mailboxRef01DataResult)
		if mailboxRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func mailboxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "mailbox", "MailboxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read mailbox test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse mailbox test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"mailbox01", "mailbox02", "mailbox03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TEMPMAIL_TEST_MAILBOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TEMPMAIL_TEST_MAILBOX_ENTID": idmap,
		"TEMPMAIL_TEST_LIVE":      "FALSE",
		"TEMPMAIL_TEST_EXPLAIN":   "FALSE",
		"TEMPMAIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TEMPMAIL_TEST_MAILBOX_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TEMPMAIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TEMPMAIL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTempMailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TEMPMAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TEMPMAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
