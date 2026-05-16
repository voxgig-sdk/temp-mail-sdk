<?php
declare(strict_types=1);

// TempMail SDK utility: prepare_body

class TempMailPrepareBody
{
    public static function call(TempMailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
