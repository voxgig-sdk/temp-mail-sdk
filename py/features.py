# TempMail SDK feature factory

from feature.base_feature import TempMailBaseFeature
from feature.test_feature import TempMailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TempMailBaseFeature(),
        "test": lambda: TempMailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
