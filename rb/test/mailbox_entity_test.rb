# Mailbox entity test

require "minitest/autorun"
require "json"
require_relative "../TempMail_sdk"
require_relative "runner"

class MailboxEntityTest < Minitest::Test
  def test_create_instance
    testsdk = TempMailSDK.test(nil, nil)
    ent = testsdk.Mailbox(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = mailbox_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "mailbox." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set TEMPMAIL_TEST_MAILBOX_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    mailbox_ref01_ent = client.Mailbox(nil)
    mailbox_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.mailbox"), "mailbox_ref01"))

    mailbox_ref01_data_result = mailbox_ref01_ent.create(mailbox_ref01_data, nil)
    mailbox_ref01_data = Helpers.to_map(mailbox_ref01_data_result)
    assert !mailbox_ref01_data.nil?

  end
end

def mailbox_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "mailbox", "MailboxTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TempMailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["mailbox01", "mailbox02", "mailbox03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["TEMPMAIL_TEST_MAILBOX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TEMPMAIL_TEST_MAILBOX_ENTID" => idmap,
    "TEMPMAIL_TEST_LIVE" => "FALSE",
    "TEMPMAIL_TEST_EXPLAIN" => "FALSE",
    "TEMPMAIL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["TEMPMAIL_TEST_MAILBOX_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TEMPMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["TEMPMAIL_APIKEY"],
      },
      extra || {},
    ])
    client = TempMailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TEMPMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TEMPMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
