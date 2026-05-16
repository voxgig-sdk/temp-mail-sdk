-- ProjectName SDK exists test

local sdk = require("temp-mail_sdk")

describe("TempMailSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
