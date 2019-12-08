import { Router } from 'express';
import { expressHandler } from '../../../../../common/utils/express-utils';
import {
    signUpHandler,
    loginHandler,
    profileHandler,
} from './handlers';

export const formProvider = Router();

formProvider.post('/sign-up', expressHandler(signUpHandler));
formProvider.post('/login', expressHandler(loginHandler));
formProvider.get('/profile', expressHandler(profileHandler));
