import { useAsync } from '@glate/core';
import { useExpressRequest } from './express-request';
import { useExpressResponse } from './express-response';

export const useExpressMiddleware = (middleware) => {
    const req = useExpressRequest();
    const res = useExpressResponse();
    const applied = useAsync(async () => {
        await new Promise((resolve, reject) => middleware(req, res, resolve));
        return true;
    });
    return { applied };
};
