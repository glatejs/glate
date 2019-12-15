import { bodyParser } from 'express';
import { useExpressMiddleware } from './express-middleware';
import { useExpressRequest } from './express-request';

export const useBodyJson = () => {
    useExpressMiddleware(bodyParser.urlencoded()); // TODO optimize
    const req = useExpressRequest();
    return req.body;
};
