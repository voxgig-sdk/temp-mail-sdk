# TempMail SDK utility: feature_add
module TempMailUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
