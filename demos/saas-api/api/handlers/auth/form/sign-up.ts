import bcrypt from 'bcryptjs';
import { Repository, getRepository } from 'typeorm';
import { useAsync, useEffect } from '@glate/core';
import { useResponse, useBodyJson } from '@glate/http';
import { User } from '../../../data-access/models/user';
import { Invite } from '../../../data-access/models/invite';
import { Membership, MembershipRole } from '../../../data-access/models/membership';
import { Account } from '../../../data-access/models/account';
import { UserError, ErrorCodes } from '../../../utils/user-error';
import { generateJwtToken } from '../../../utils/jwt';

const generateUserToken = (user: User) => {
    const token = generateJwtToken({
        userId: user.id,
    });
    return token;
};

export const signUp = () => {
    const { email, password } = useBodyJson();
    const users = getRepository(User);
    const invites = getRepository(Invite);
    const memberships = getRepository(Membership);
    const { setBodyFragment } = useResponse();

    // const { currentUser } = useCurrentUser(); // don't run effects until async hooks are resolved

    useEffect(async () => {
        const existingUser = await users.findOne({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new UserError(ErrorCodes.USER_ALREADY_EXISTS, `User '${email}' already exists`);
        }

        const user = new User();
        Object.assign(user, {
            email,
            password: bcrypt.hashSync(password, 8),
        });
        const newUser = await users.save(user);

        setBodyFragment({
            user: newUser,
            token: generateUserToken(newUser),
        });

        const invite = await invites.findOne({
            where: {
                email,
                accepted: false,
            },
        });
        const membership = new Membership();
        membership.user = user;
        if (invite) {
            membership.account = invite.account;
            membership.role = MembershipRole.MEMBER;
            invite.accepted = true;
            await invites.save(invite);
        } else {
            const account = new Account();
            account.title = 'My Notes';
            await invites.save(account);
            membership.account = account;
            membership.role = MembershipRole.ADMIN;
        }
        await memberships.save(membership);
    });
};
