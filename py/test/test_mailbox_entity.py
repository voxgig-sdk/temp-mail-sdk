# Mailbox entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from tempmail_sdk import TempMailSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestMailboxEntity:

    def test_should_create_instance(self):
        testsdk = TempMailSDK.test(None, None)
        ent = testsdk.Mailbox(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _mailbox_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "mailbox." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set TEMPMAIL_TEST_MAILBOX_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        mailbox_ref01_ent = client.Mailbox(None)
        mailbox_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.mailbox"), "mailbox_ref01"))

        mailbox_ref01_data_result, err = mailbox_ref01_ent.create(mailbox_ref01_data, None)
        assert err is None
        mailbox_ref01_data = helpers.to_map(mailbox_ref01_data_result)
        assert mailbox_ref01_data is not None



def _mailbox_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/mailbox/MailboxTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TempMailSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["mailbox01", "mailbox02", "mailbox03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "TEMPMAIL_TEST_MAILBOX_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TEMPMAIL_TEST_MAILBOX_ENTID": idmap,
        "TEMPMAIL_TEST_LIVE": "FALSE",
        "TEMPMAIL_TEST_EXPLAIN": "FALSE",
        "TEMPMAIL_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("TEMPMAIL_TEST_MAILBOX_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("TEMPMAIL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("TEMPMAIL_APIKEY"),
            },
            extra or {},
        ])
        client = TempMailSDK(helpers.to_map(merged_opts))

    _live = env.get("TEMPMAIL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("TEMPMAIL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
