# TempMail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TempMailFeatures
  def self.make_feature(name)
    case name
    when "base"
      TempMailBaseFeature.new
    when "ratelimit"
      TempMailRatelimitFeature.new
    when "retry"
      TempMailRetryFeature.new
    when "test"
      TempMailTestFeature.new
    when "timeout"
      TempMailTimeoutFeature.new
    else
      TempMailBaseFeature.new
    end
  end
end
