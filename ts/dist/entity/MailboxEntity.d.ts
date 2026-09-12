import { TempMailEntityBase } from '../TempMailEntityBase';
import type { TempMailSDK } from '../TempMailSDK';
import type { Control } from '../types';
import type { Mailbox, MailboxCreateData } from '../TempMailTypes';
declare class MailboxEntity extends TempMailEntityBase<Mailbox> {
    constructor(client: TempMailSDK, entopts: any);
    make(this: MailboxEntity): MailboxEntity;
    create(this: any, reqdata?: MailboxCreateData, ctrl?: Control): Promise<MailboxEntity>;
}
export { MailboxEntity };
