# TempMail SDK utility: make_context
require_relative '../core/context'
module TempMailUtilities
  MakeContext = ->(ctxmap, basectx) {
    TempMailContext.new(ctxmap, basectx)
  }
end
