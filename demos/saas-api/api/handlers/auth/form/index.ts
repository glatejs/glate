import { useRoute } from '@glate/http';
import { signUp } from './sign-up';
// import { invite } from './invite';
// import { login } from './login';
// import { changePassword } from './change-password';
// import { profile } from './profile';

export const formAuth = () => {
    useRoute('/sign-up', { POST: signUp });
    // route('/invite', invite);
    // route('/login', login);
    // route('/change-password', changePassword);
    // route('/profile', profile);
};