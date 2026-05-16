<?php
declare(strict_types=1);

// TempMail SDK utility: result_body

class TempMailResultBody
{
    public static function call(TempMailContext $ctx): ?TempMailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
