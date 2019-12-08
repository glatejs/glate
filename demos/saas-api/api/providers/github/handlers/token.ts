import axios from 'axios';
import { UserError, ErrorCodes } from '../../../../../../common/utils/user-error';

export interface IGithubTokenRequest {
    access_token: string;
    token_type: string;
}

export interface IGithubTokenResponse {
}

export const tokenHandler = async (request: IGithubTokenRequest): Promise<IGithubTokenResponse> => {
    const {
        access_token,
        token_type,
    } = request;

    return {
        access_token,
        token_type,
    };
};
