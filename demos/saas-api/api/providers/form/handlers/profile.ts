import { UserError, ErrorCodes } from '../../../utils/user-error';

export interface IProfileRequest {
    user: any;
}

export interface IProfileResponse {
    profile: any;
}

export const profileHandler = async (request: IProfileRequest): Promise<IProfileResponse> => {
    const { user } = request;
    const profile = user; // await UserRepo.findOne({ where: { id: user.id } });

    if (!profile) {
        throw new UserError(ErrorCodes.USER_NOT_FOUND, `User '${user.id}' not found`);
    } else {
        return { profile };
    }
};
