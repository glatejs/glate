import { useContext } from '@glate/core';

export const EXPRESS_REQUEST_SYMBOL = Symbol('Express request');

export const useExpressRequest = () => {
    const [ req ] = useContext(EXPRESS_REQUEST_SYMBOL);
    return req;
};
