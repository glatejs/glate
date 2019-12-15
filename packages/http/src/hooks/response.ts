import { useContext } from '@glate/core';

export const RESPONSE_SYMBOL = Symbol('Response data collector');

export const useResponse = () => {
    const [ response, setResponse ] = useContext(RESPONSE_SYMBOL);
    const setBody = (body) => {
        response.body = body;
    };
    const setBodyFragment = (bodyFragment) => {
        response.body = {
            ...response.body,
            ...bodyFragment,
        };
    };
    return {
        response,
        setBody,
        setBodyFragment,
    };
};
