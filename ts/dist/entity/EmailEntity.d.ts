import { TempMailEntityBase } from '../TempMailEntityBase';
import type { TempMailSDK } from '../TempMailSDK';
import type { Control } from '../types';
import type { Email, EmailListMatch } from '../TempMailTypes';
declare class EmailEntity extends TempMailEntityBase<Email> {
    constructor(client: TempMailSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    list(this: any, reqmatch?: EmailListMatch, ctrl?: Control): Promise<EmailEntity[]>;
}
export { EmailEntity };
