import { useContext, dispatch } from '@glate/core';
import { EXPRESS_REQUEST_SYMBOL } from '../hooks/express-request';
import { RESPONSE_SYMBOL } from '../hooks/response';

export const createMiddleware = (glateHandler) => (req, res, next) => {
    console.log('Express request');
    const initContext = () => {
        useContext(EXPRESS_REQUEST_SYMBOL, req);
        useContext(RESPONSE_SYMBOL, {});
    };
    const finalize = () => {
        const [ response ] = useContext(RESPONSE_SYMBOL);
        res.send(response.body);
        next();
    };
    dispatch(
        glateHandler,
        initContext,
        finalize,
    );
};
