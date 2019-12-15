import { useHandlerContext } from '../core';

export const useContext = (symbol: symbol, initialState?: any) => {
    const requestContext = useHandlerContext();
    const states = requestContext.contextStates;
    if (!(symbol in states)) {
        states[symbol] = initialState;
    }
    const state = states[symbol];
    return [
        state,
        (newState) => {
            states[symbol] = newState;
        },
    ];
};
