import { Context } from './Context';
declare class TempMailError extends Error {
    isTempMailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { TempMailError };
