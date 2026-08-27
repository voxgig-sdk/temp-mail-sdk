<?php
declare(strict_types=1);

// TempMail SDK configuration

class TempMailConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TempMail",
                "slug" => "temp-mail",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://hub.juheapi.com/temp-mail/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "email" => [],
                    "mailbox" => [],
                ],
            ],
            "entity" => [
        'email' => [
          'fields' => [
            [
              'name' => 'attachments',
              'req' => true,
              'short' => 'List of attachments in the email',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'body',
              'req' => true,
              'short' => 'Body content of the email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'from',
              'req' => true,
              'short' => 'Email address of the sender',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'received_at',
              'short' => 'Unix timestamp when the email was received',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'subject',
              'req' => true,
              'short' => 'Subject line of the email',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'email',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'mailbox_12345',
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/get-emails',
                  'parts' => [
                    'get-emails',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'mailbox' => [
          'fields' => [
            [
              'name' => 'domain',
              'short' => 'Optional domain for the temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'short' => 'Generated temporary email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'short' => 'Unix timestamp when the mailbox expires',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the mailbox',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'mailbox',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/create',
                  'parts' => [
                    'create',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TempMailFeatures::make_feature($name);
    }
}
