
import { Context } from './Context'


class TempMailError extends Error {

  isTempMailError = true

  sdk = 'TempMail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TempMailError
}

