-- TempMail SDK error

local TempMailError = {}
TempMailError.__index = TempMailError


function TempMailError.new(code, msg, ctx)
  local self = setmetatable({}, TempMailError)
  self.is_sdk_error = true
  self.sdk = "TempMail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TempMailError:error()
  return self.msg
end


function TempMailError:__tostring()
  return self.msg
end


return TempMailError
