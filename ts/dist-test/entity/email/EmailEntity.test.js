"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EmailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TempMailSDK.test();
        const ent = testsdk.Email();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TEMP_MAIL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "attachments", "req": true, "short": "List of attachments in the email", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "body", "req": true, "short": "Body content of the email", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "from", "req": true, "short": "Email address of the sender", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": true, "short": "Unique identifier for the email", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "received_at", "req": false, "short": "Unix timestamp when the email was received", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "subject", "req": true, "short": "Subject line of the email", "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "email", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "mailbox_12345", "kind": "query", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /get-emails", "json": "{\"operationId\":\"getEmails\",\"parameters\":[{\"description\":\"Unique identifier of the temporary mailbox obtained from the create endpoint\",\"in\":\"query\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":\"mailbox_12345\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful email retrieval\",\"value\":{\"code\":\"0\",\"data\":[{\"attachments\":[],\"body\":\"Hello, this is a test email.\",\"from\":\"sender@example.com\",\"id\":\"email_id_1\",\"subject\":\"Welcome!\"}],\"msg\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"0\",\"type\":\"string\"},\"data\":{\"items\":{\"properties\":{\"attachments\":{\"description\":\"List of attachments in the email\",\"items\":{\"properties\":{\"content_type\":{\"description\":\"MIME type of the attachment\",\"type\":\"string\"},\"filename\":{\"description\":\"Name of the attachment file\",\"type\":\"string\"},\"size\":{\"description\":\"Size of the attachment in bytes\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Body content of the email\",\"example\":\"Hello, this is a test email.\",\"type\":\"string\"},\"from\":{\"description\":\"Email address of the sender\",\"example\":\"sender@example.com\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the email\",\"example\":\"email_id_1\",\"type\":\"string\"},\"received_at\":{\"description\":\"Unix timestamp when the email was received\",\"example\":1735689600,\"type\":\"integer\"},\"subject\":{\"description\":\"Subject line of the email\",\"example\":\"Welcome!\",\"type\":\"string\"}},\"required\":[\"id\",\"from\",\"subject\",\"body\",\"attachments\"],\"type\":\"object\"},\"type\":\"array\"},\"msg\":{\"description\":\"Response message\",\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Emails retrieved successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Bad request - Missing or invalid mailbox ID\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Mailbox not found or expired\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain your key from the developer console.\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/get-emails", "segments": [{ "lit": "get-emails" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "email", "name__orig": "email", "Name": "Email", "name_": "email", "name-": "email", "NAME": "EMAIL", "index$": 0 }, { "active": true, "entity": "email", "key$": "BasicEmailFlow", "kind": "basic", "name": "BasicEmailFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "email_ref01" } }], "index$": 0 }] }, 'Email');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let email_ref01_data = Object.values(setup.data.existing.email)[0];
        // LIST
        const email_ref01_ent = client.Email();
        const email_ref01_match = {};
        const email_ref01_list = (await email_ref01_ent.list(email_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email/EmailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email01', 'email02', 'email03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TEMP_MAIL_TEST_EMAIL_ENTID': idmap,
        'TEMP_MAIL_TEST_LIVE': 'FALSE',
        'TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'TEMP_MAIL_APIKEY': '',
    });
    idmap = env['TEMP_MAIL_TEST_EMAIL_ENTID'];
    const live = 'TRUE' === env.TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TEMP_MAIL_TEST_EMAIL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TempMailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.TEMP_MAIL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.TEMP_MAIL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EmailEntity.test.js.map