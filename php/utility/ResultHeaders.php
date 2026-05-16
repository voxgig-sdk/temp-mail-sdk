<?php
declare(strict_types=1);

// TempMail SDK utility: result_headers

class TempMailResultHeaders
{
    public static function call(TempMailContext $ctx): ?TempMailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
