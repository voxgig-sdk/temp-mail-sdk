<?php
declare(strict_types=1);

// TempMail SDK utility: feature_add

class TempMailFeatureAdd
{
    public static function call(TempMailContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
