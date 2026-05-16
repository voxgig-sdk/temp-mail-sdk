<?php
declare(strict_types=1);

// TempMail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TempMailMakeContext
{
    public static function call(array $ctxmap, ?TempMailContext $basectx): TempMailContext
    {
        return new TempMailContext($ctxmap, $basectx);
    }
}
