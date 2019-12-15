import { useContext } from '@glate/core';
import { useHttpMethod } from './method';
import { match as createMatcher } from 'path-to-regexp';
import { useExpressRequest } from './express-request';

const ROUTER_SYMBOL = Symbol('Router match');

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    ANY = '*',
}

export type IHandlerMap = {
    [key in keyof typeof HttpMethods]?: () => any
};

const isHandlerMap = (arg: any): boolean => {
    return typeof arg === 'object';
};

export const useRoute = (path: string, handler: IHandlerMap | (() => any)): any => {
    const req = useExpressRequest();
    const [ parentMatch, setRouteMatch ] = useContext(ROUTER_SYMBOL);

    const matcher = createMatcher(path, { end: false });
    const match = matcher(req.originalUrl);
    console.log(`matching: ${path}`, req.originalUrl);
    if (match) {
        console.log('match', req.originalUrl);
        setRouteMatch(match);

        if (isHandlerMap(handler)) {
            const method = useHttpMethod();
            const methodHandler = handler[method];
            if (!methodHandler) {
                throw new Error(`${method} handler not found`);
            }
            methodHandler();
        } else {
            (handler as () => void)();
        }

        setRouteMatch(parentMatch);
    }
};

export const useRouteMatch = () => {
    const [ match ] = useContext(ROUTER_SYMBOL);
    return match;
};
