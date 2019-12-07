import { dispatch, useContext } from '@glate/core';

const REQUEST_SYMBOL = Symbol('Express request');
const RESPONSE_SYMBOL = Symbol('Response data collector');

export const useParams = () => {
    const [ req ] = useContext(REQUEST_SYMBOL);
    return req.params;
}

export const useParam = (paramName) => {
    const params = useParams();
    return params[paramName];
}

export const useResponse = () => {
    const [ response, setResponse ] = useContext(RESPONSE_SYMBOL);
    const setBody = (body) => {
        setResponse({
            ...response,
            body,
        });
    };
    return {
        response,
        setBody,
    };
}

export const useRouter = () => {
    const route = (path, handler) => {
        // TODO
    };
    return {
        route,
    }
};

export const glate = (glateHandler) => (req, res, next) => {
    const initContext = () => {
        useContext(REQUEST_SYMBOL, req);
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