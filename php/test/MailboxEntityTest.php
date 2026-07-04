<?php
declare(strict_types=1);

// Mailbox entity test

require_once __DIR__ . '/../tempmail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MailboxEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TempMailSDK::test(null, null);
        $ent = $testsdk->Mailbox(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = mailbox_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "mailbox." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set TEMPMAIL_TEST_MAILBOX_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $mailbox_ref01_ent = $client->Mailbox(null);
        $mailbox_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.mailbox"), "mailbox_ref01"));

        $mailbox_ref01_data_result = $mailbox_ref01_ent->create($mailbox_ref01_data, null);
        $mailbox_ref01_data = Helpers::to_map($mailbox_ref01_data_result);
        $this->assertNotNull($mailbox_ref01_data);

    }
}

function mailbox_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/mailbox/MailboxTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TempMailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["mailbox01", "mailbox02", "mailbox03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("TEMPMAIL_TEST_MAILBOX_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "TEMPMAIL_TEST_MAILBOX_ENTID" => $idmap,
        "TEMPMAIL_TEST_LIVE" => "FALSE",
        "TEMPMAIL_TEST_EXPLAIN" => "FALSE",
        "TEMPMAIL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["TEMPMAIL_TEST_MAILBOX_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["TEMPMAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["TEMPMAIL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new TempMailSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["TEMPMAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["TEMPMAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
