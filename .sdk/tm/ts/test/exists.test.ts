
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TempMailSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TempMailSDK.test()
    equal(null !== testsdk, true)
  })

})
