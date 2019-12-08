import express from 'express';
import bodyParser from 'body-parser';
import { match as createMatcher } from 'path-to-regexp';
import { dispatch, useContext } from '@glate/core';

const REQUEST_SYMBOL = Symbol('Express request');
const RESPONSE_SYMBOL = Symbol('Response data collector');
const ROUTER_SYMBOL = Symbol('Router match');

export const useRequest = () => {
    const [ req ] = useContext(REQUEST_SYMBOL);
    return req;
}

export const useResponse = () => {
    const [ response, setResponse ] = useContext(RESPONSE_SYMBOL);
    const setBody = (body) => {
        response.body = body;
    };
    const setBodyFragment = (bodyFragment) => {
        response.body = {
            ...response.body,
            ...bodyFragment,
        }
    };
    return {
        response,
        setBody,
        setBodyFragment,
    };
};

// export const useRouter = () => {
//     return {
//         useRoute: (path: string, handler: () => void) => () => useRoute(path, handler),
//         switcher,
//     };
// };

// const useSwitch = (...routes) => {
//     let matched = false;
//     while (!matched) {
//         const route = routes.shift();
//         matched = route();
//     }
// };

export const useRoute = (path: string, handler: () => void): boolean => {
    const req = useRequest();
    const [ parentMatch, setRouteMatch ] = useContext(ROUTER_SYMBOL);

    const matcher = createMatcher(path);
    const match = matcher(req.originalUrl);
    if (match) {
        setRouteMatch(match);
        handler();
        setRouteMatch(parentMatch);
        return true;
    }
    return false;
};

export const useRouteMatch = () => {
    const [ match ] = useContext(ROUTER_SYMBOL);
    return match;
}

export const useParams = () => {
    const match = useRouteMatch();
    return match ? match.params : {};
}

export const useParam = (paramName) => {
    const params = useParams();
    return params[paramName];
}

const createMiddleware = (glateHandler) => (req, res, next) => {
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

export const createHttpServer = (httpHandler) => {
    const app = express();
    app.use(bodyParser.urlencoded());
    app.use(createMiddleware(httpHandler));
    return {
        listen: (port) => app.listen(port),
    }
};