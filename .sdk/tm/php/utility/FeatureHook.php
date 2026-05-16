<?php
declare(strict_types=1);

// TempMail SDK utility: feature_hook

class TempMailFeatureHook
{
    public static function call(TempMailContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
