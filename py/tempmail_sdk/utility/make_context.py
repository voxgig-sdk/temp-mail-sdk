# TempMail SDK utility: make_context

from tempmail_sdk.core.context import TempMailContext


def make_context_util(ctxmap, basectx):
    return TempMailContext(ctxmap, basectx)
