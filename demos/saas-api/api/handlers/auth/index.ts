import { useRouter } from '@glate/http';
import { formAuth } from './form';

export const authHandler = () => {
    const { route, all } = useRouter();

    route(
        all('/form', formAuth),
    );
};
