import { Router } from 'express';
import { expressHandler } from '../../../../../common/utils/express-utils';
import { authHandler } from './handlers/auth';
import { callbackHandler } from './handlers/callback';
import { tokenHandler } from './handlers/token';

export const githubProvider = Router();

githubProvider.get('/', expressHandler(authHandler));
githubProvider.get('/callback', expressHandler(callbackHandler));
githubProvider.get('/token', expressHandler(tokenHandler));
