# TempMail SDK feature factory

from tempmail_sdk.feature.base_feature import TempMailBaseFeature
from tempmail_sdk.feature.test_feature import TempMailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TempMailBaseFeature(),
        "test": lambda: TempMailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
