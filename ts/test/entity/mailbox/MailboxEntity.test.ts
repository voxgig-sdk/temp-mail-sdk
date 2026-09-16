

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TempMailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MailboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TempMailSDK.test()
    const ent = testsdk.Mailbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TEMP_MAIL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"domain","req":false,"short":"Optional domain for the temporary email address","type":"`$STRING`","index$":0},{"active":true,"name":"email","req":false,"short":"Generated temporary email address","type":"`$STRING`","index$":1},{"active":true,"name":"expires_at","req":false,"short":"Unix timestamp when the mailbox expires","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the mailbox","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"mailbox","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /create","json":"{\"operationId\":\"createMailbox\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"domain\":{\"description\":\"Optional domain for the temporary email address\",\"example\":\"tempmail.com\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Optional parameters for mailbox creation\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful mailbox creation\",\"value\":{\"code\":\"0\",\"data\":{\"email\":\"random123@tempmail.com\",\"expires_at\":1735689600,\"id\":\"mailbox_12345\"},\"msg\":\"success\"}}},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response code\",\"example\":\"0\",\"type\":\"string\"},\"data\":{\"properties\":{\"email\":{\"description\":\"Generated temporary email address\",\"example\":\"random123@tempmail.com\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Unix timestamp when the mailbox expires\",\"example\":1735689600,\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the mailbox\",\"example\":\"mailbox_12345\",\"type\":\"string\"}},\"type\":\"object\"},\"msg\":{\"description\":\"Response message\",\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Mailbox created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Bad request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid API key\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain your key from the developer console.\",\"in\":\"header\",\"name\":\"Authorization\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/create","segments":[{"lit":"create"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"mailbox","name__orig":"mailbox","Name":"Mailbox","name_":"mailbox","name-":"mailbox","NAME":"MAILBOX","index$":1}, {"active":true,"entity":"mailbox","key$":"BasicMailboxFlow","kind":"basic","name":"BasicMailboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"mailbox_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Mailbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const mailbox_ref01_ent = client.Mailbox()
    let mailbox_ref01_data = setup.data.new.mailbox['mailbox_ref01']

    mailbox_ref01_data = (await mailbox_ref01_ent.create(mailbox_ref01_data)).data()
    assert(null != mailbox_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mailbox/MailboxTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TempMailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['mailbox01','mailbox02','mailbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TEMP_MAIL_TEST_MAILBOX_ENTID': idmap,
    'TEMP_MAIL_TEST_LIVE': 'FALSE',
    'TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'TEMP_MAIL_APIKEY': '',
  })

  idmap = env['TEMP_MAIL_TEST_MAILBOX_ENTID']

  const live = 'TRUE' === env.TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TEMP_MAIL_TEST_MAILBOX_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TempMailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
