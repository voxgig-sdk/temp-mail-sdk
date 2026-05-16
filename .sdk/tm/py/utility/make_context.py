# TempMail SDK utility: make_context

from core.context import TempMailContext


def make_context_util(ctxmap, basectx):
    return TempMailContext(ctxmap, basectx)
