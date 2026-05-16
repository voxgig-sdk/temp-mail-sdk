<?php
declare(strict_types=1);

// TempMail SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TempMailUtility::setRegistrar(function (TempMailUtility $u): void {
    $u->clean = [TempMailClean::class, 'call'];
    $u->done = [TempMailDone::class, 'call'];
    $u->make_error = [TempMailMakeError::class, 'call'];
    $u->feature_add = [TempMailFeatureAdd::class, 'call'];
    $u->feature_hook = [TempMailFeatureHook::class, 'call'];
    $u->feature_init = [TempMailFeatureInit::class, 'call'];
    $u->fetcher = [TempMailFetcher::class, 'call'];
    $u->make_fetch_def = [TempMailMakeFetchDef::class, 'call'];
    $u->make_context = [TempMailMakeContext::class, 'call'];
    $u->make_options = [TempMailMakeOptions::class, 'call'];
    $u->make_request = [TempMailMakeRequest::class, 'call'];
    $u->make_response = [TempMailMakeResponse::class, 'call'];
    $u->make_result = [TempMailMakeResult::class, 'call'];
    $u->make_point = [TempMailMakePoint::class, 'call'];
    $u->make_spec = [TempMailMakeSpec::class, 'call'];
    $u->make_url = [TempMailMakeUrl::class, 'call'];
    $u->param = [TempMailParam::class, 'call'];
    $u->prepare_auth = [TempMailPrepareAuth::class, 'call'];
    $u->prepare_body = [TempMailPrepareBody::class, 'call'];
    $u->prepare_headers = [TempMailPrepareHeaders::class, 'call'];
    $u->prepare_method = [TempMailPrepareMethod::class, 'call'];
    $u->prepare_params = [TempMailPrepareParams::class, 'call'];
    $u->prepare_path = [TempMailPreparePath::class, 'call'];
    $u->prepare_query = [TempMailPrepareQuery::class, 'call'];
    $u->result_basic = [TempMailResultBasic::class, 'call'];
    $u->result_body = [TempMailResultBody::class, 'call'];
    $u->result_headers = [TempMailResultHeaders::class, 'call'];
    $u->transform_request = [TempMailTransformRequest::class, 'call'];
    $u->transform_response = [TempMailTransformResponse::class, 'call'];
});
