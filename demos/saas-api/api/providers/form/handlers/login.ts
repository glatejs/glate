import { generateJwtToken } from '../../../utils';
import { UserError, ErrorCodes } from '../../../utils/user-error';

export interface ILoginRequest {
    email: string;
}

export interface ILoginResponse {
    user: any;
    token: string;
}

export const loginHandler = async (request: ILoginRequest): Promise<ILoginResponse> => {
    const { email } = request;
    const user = { email }; // await UserRepo.findOne({ where: { email } });

    if (!user) {
        throw new UserError(ErrorCodes.USER_NOT_FOUND, `User '${user.email}' not found`);
    } else {
        const token = await generateJwtToken(user);
        return { user, token };
    }
};
