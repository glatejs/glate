import { UserError, ErrorCodes } from '../../../../../../common/utils/user-error';

export interface IGithubAuthRequest {
}

export interface IGithubAuthResponse {
}

export const authHandler = async (request: IGithubAuthRequest): Promise<IGithubAuthResponse> => {
    // const { user } = request;
    const clientId = '26e1cf795c18585083f5';
    const scope = 'user:email';

    return {
        __redirect: `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`,
    };
};
