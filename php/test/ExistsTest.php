<?php
declare(strict_types=1);

// TempMail SDK exists test

require_once __DIR__ . '/../tempmail_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TempMailSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
