import { useExpressRequest } from './express-request';

export const useHttpMethod = () => {
    const req = useExpressRequest();
    return req.method;
};
