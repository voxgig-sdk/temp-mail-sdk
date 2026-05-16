<?php
declare(strict_types=1);

// TempMail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TempMailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TempMailBaseFeature();
            case "test":
                return new TempMailTestFeature();
            default:
                return new TempMailBaseFeature();
        }
    }
}
