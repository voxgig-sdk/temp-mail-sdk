<?php
declare(strict_types=1);

// TempMail SDK base feature

class TempMailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TempMailContext $ctx, array $options): void {}
    public function PostConstruct(TempMailContext $ctx): void {}
    public function PostConstructEntity(TempMailContext $ctx): void {}
    public function SetData(TempMailContext $ctx): void {}
    public function GetData(TempMailContext $ctx): void {}
    public function GetMatch(TempMailContext $ctx): void {}
    public function SetMatch(TempMailContext $ctx): void {}
    public function PrePoint(TempMailContext $ctx): void {}
    public function PreSpec(TempMailContext $ctx): void {}
    public function PreRequest(TempMailContext $ctx): void {}
    public function PreResponse(TempMailContext $ctx): void {}
    public function PreResult(TempMailContext $ctx): void {}
    public function PreDone(TempMailContext $ctx): void {}
    public function PreUnexpected(TempMailContext $ctx): void {}
}
