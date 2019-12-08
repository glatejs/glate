import axios from 'axios';
import { UserError, ErrorCodes } from '../../../../../../common/utils/user-error';

export interface IGithubCallbackRequest {
    code: string;
}

export interface IGithubCallbackResponse {
}

export const callbackHandler = async (request: IGithubCallbackRequest): Promise<IGithubCallbackResponse> => {
    const { code } = request;

    const clientId = '26e1cf795c18585083f5';
    const clientSecret = '5924ca666d8e9d12f1d2b70f9a048062cfcb5a7e';
    const requestTokenUri = 'https://github.com/login/oauth/access_token';

    const result = await axios.post(requestTokenUri, {
        client_id: clientId,
        client_secret: clientSecret,
        code,
    });

    return {
        code,
        result: result.data,
    };
};
