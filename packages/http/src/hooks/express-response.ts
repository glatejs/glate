import { useContext } from '@glate/core';

export const EXPRESS_RESPONSE_SYMBOL = Symbol('Express response');

export const useExpressResponse = () => {
    const [ res ] = useContext(EXPRESS_RESPONSE_SYMBOL);
    return res;
};
