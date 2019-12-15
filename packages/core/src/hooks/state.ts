import { useHandlerContext } from '../core';

export const useState = (initialState?: any) => {
    const requestContext = useHandlerContext();
    const states = requestContext.states;
    const index = requestContext.currentStateIndex;
    const state = states.length === index ? initialState : states[index];
    requestContext.currentStateIndex++;
    return [
        state,
        (newState) => {
            states[index] = newState;
        },
    ];
};
