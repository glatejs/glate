import { JsonController, Get, Post, BodyParam } from 'routing-controllers';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { useAsync } from '@glate/core';
import { User } from '../data-access/models/user';
import { Invite } from '../data-access/models/invite';
import { Membership, MembershipRole } from '../data-access/models/membership';
import { Account } from '../data-access/models/account';
import { UserError, ErrorCodes } from '../utils/user-error';
import { generateJwtToken } from '../utils/jwt';
import { IUserContext, IMembershipContext, UserContext, UserContextRequired } from '../decorators/user-context';


const invite = async (
    @UserContext({ required: UserContextRequired.MEMBERSHIP }) context: IMembershipContext,
    @BodyParam('email') email: string,
): Promise<Invite> => {
    const existingUser = await this.userRepository.findOne({
        where: {
            email,
        },
        relations: ['memberships'],
    });
    if (existingUser && existingUser.memberships.find((m) => m.account.id === context.account.id)) {
        throw new UserError(ErrorCodes.USER_ALREADY_A_MEMBER, `User '${email}' already a member of the account ${context.account.id}`);
    }
    const existingInvite = await this.inviteRepository.findOne({
        where: {
            email,
            accountId: context.account.id,
        },
    });
    if (existingInvite) {
        throw new UserError(ErrorCodes.USER_ALREADY_INVITED, `User '${email}' already invited`);
    }
    const invite = new Invite();
    invite.email = email;

    return await this.inviteRepository.save(invite);
}

const login = async (
    @BodyParam('email') email: string,
    @BodyParam('password') password: string,
): Promise<{ user: User, token: string }> => {
    const user = await this.userRepository.findOne({
        where: {
            email,
        },
        select: ['id', 'password']
    });
    if (!user) {
        throw new UserError(ErrorCodes.USER_NOT_FOUND, `User '${email}' not found`);
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new UserError(ErrorCodes.WRONG_CREDENTIALS, `Wrong email or password`);
    }
    return { user, token: generateUserToken(user) };
}

const changePassword = async (
    @UserContext({ required: UserContextRequired.USER }) context: IUserContext,
    @BodyParam('old-password') oldPassword: string,
    @BodyParam('new-password') newPassword: string,
): Promise<User> => {
    const { password } = await this.userRepository.findOne({
        where: {
            id: context.user.id,
        },
        select: ['id', 'password']
    });

    if (!bcrypt.compareSync(oldPassword, password)) {
        throw new UserError(ErrorCodes.WRONG_OLD_PASSWORD, `Wrong old password provided`);
    }
    context.user.password = bcrypt.hashSync(newPassword, 8);
    return await this.userRepository.save(context.user);
}

const profile = (
    @UserContext({ required: UserContextRequired.USER }) context: IUserContext,
): User => {
    return context.user;
}
