# TempMail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TempMailFeatures
  def self.make_feature(name)
    case name
    when "base"
      TempMailBaseFeature.new
    when "test"
      TempMailTestFeature.new
    else
      TempMailBaseFeature.new
    end
  end
end
