import express from 'express';
import bodyParser from 'body-parser';
import { match as createMatcher } from 'path-to-regexp';
import { dispatch, useContext, useAsync, useEffect } from '@glate/core';

const EXPRESS_REQUEST_SYMBOL = Symbol('Express request');
const EXPRESS_RESPONSE_SYMBOL = Symbol('Express response');
const RESPONSE_SYMBOL = Symbol('Response data collector');
const ROUTER_SYMBOL = Symbol('Router match');

const useExpressRequest = () => {
    const [ req ] = useContext(EXPRESS_REQUEST_SYMBOL);
    return req;
};

const useExpressResponse = () => {
    const [ res ] = useContext(EXPRESS_RESPONSE_SYMBOL);
    return res;
};

const useExpressMiddleware = (middleware) => {
    const req = useExpressRequest();
    const res = useExpressResponse();
    const applied = useAsync(async () => {
        await new Promise((resolve, reject) => middleware(req, res, resolve));
        return true;
    });
    return { applied };
};

export const useBodyJson = () => {
    useExpressMiddleware(bodyParser.urlencoded()); // TODO optimize
    const req = useExpressRequest();
    return req.body;
};

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
    const req = useExpressRequest();
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

export const createHttpServer = (httpHandler) => {
    const app = express();
    app.use(bodyParser.urlencoded());
    app.use(createMiddleware(httpHandler));
    return {
        listen: (port) => app.listen(port),
    }
};