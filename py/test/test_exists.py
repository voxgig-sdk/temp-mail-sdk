# ProjectName SDK exists test

import pytest
from tempmail_sdk import TempMailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TempMailSDK.test(None, None)
        assert testsdk is not None
