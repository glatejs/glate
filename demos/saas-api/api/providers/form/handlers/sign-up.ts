import { generateJwtToken } from '../../../utils';
import { UserError, ErrorCodes } from '../../../utils/user-error';

export interface ISignUpRequest {
    email: string;
}

export interface ISignUpResponse {
    user: any;
    token: string;
}

export const signUpHandler = async (request: ISignUpRequest): Promise<ISignUpResponse> => {
    const { email } = request;
    let user = { email }; // await UserRepo.findOne({ where: { email } });

    if (user) {
        throw new UserError(ErrorCodes.USER_ALREADY_EXISTS, `User '${user.email}' already exists`);
    } else {
        user = { email }; // user = await UserRepo.create({ email});
        const token = await generateJwtToken(user);
        return { user, token };
    }
};
