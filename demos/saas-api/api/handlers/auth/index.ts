import { useRoute } from '@glate/http';
import { formAuth } from './form';

export const authHandler = () => {
    useRoute('/form', formAuth);
};
