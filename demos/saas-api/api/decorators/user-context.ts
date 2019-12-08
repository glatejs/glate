import { Action, createParamDecorator } from '../handlers/node_modules/routing-controllers';
import { parseJwtToken } from '../utils/jwt';
import { getRepository } from 'typeorm';
import { Membership } from '../data-access/models/membership';
import { User } from '../data-access/models/user';
import { Account } from '../data-access/models/account';

export interface IUserContext {
    user: User;
}

export interface IMembershipContext extends IUserContext  {
    user: User;
    membership: Membership;
    account: Account;
}

export enum UserContextRequired {
    USER = 'USER',
    MEMBERSHIP = 'MEMBERSHIP',
    ROOT_ACCESS = 'ROOT_ACCESS',
}

export function UserContext(options?: { required?: UserContextRequired }) {
    const userRequired = options && options.required === UserContextRequired.USER;
    const membershipRequired = options && options.required === UserContextRequired.MEMBERSHIP;
    const rootAccessRequired = options && options.required === UserContextRequired.ROOT_ACCESS;

    const required = userRequired || membershipRequired || rootAccessRequired;

    return createParamDecorator({
        required,
        value: async (action: Action): Promise<IMembershipContext> => {
            let membership: Membership;
            let account: Account;

            const token = action.request.headers.authorization;
            if (!token) {
                return undefined;
            }

            const { userId } = parseJwtToken(token);
            const user = await getRepository(User).findOne({
                where: {
                    id: userId,
                },
            });

            const accountId = action.request.headers['account-id'];
            if (accountId) {
                membership = await getRepository(Membership).findOne({
                    where: {
                        accountId,
                        userId,
                    },
                    relations: ['account'],
                });
                account = membership && membership.account;
            }
            if (
                (userRequired || rootAccessRequired) && !user
                || (membershipRequired && !membership)
                || (rootAccessRequired && !user.isRoot)
            ) {
                return undefined;
            }
            return {
                user,
                membership,
                account,
            };
        },
    });
}
