import { useRouter } from '@glate/http';
import { signUp } from './sign-up';
import { invite } from './invite';
import { login } from './login';
import { changePassword } from './change-password';
import { profile } from './profile';

const formAuth = () => {
    const { route, post, get } = useRouter();

    route(
        post('/sign-up', signUp),
        post('/invite', invite),
        post('/login', login),
        post('/change-password', changePassword),
        get('/profile', profile),
    );
};