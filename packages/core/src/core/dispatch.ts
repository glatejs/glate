import { activateHandlerContext } from './handler-context';

export const dispatch = async (handler, init, finalize) => {
    const eventContext = {
        pendingEffects: [],
        effectDeps: {},
        states: [],
        contextStates: {},
    };
    activateHandlerContext(eventContext);
    init();

    let lastPassContext;
    do {
        lastPassContext = {
            ...eventContext,
            currentStateIndex: 0,
            currentEffectIndex: 0,
        };
        activateHandlerContext(lastPassContext);
        handler();
        await Promise.all(eventContext.pendingEffects);
    } while (eventContext.pendingEffects.length);

    activateHandlerContext(lastPassContext);
    finalize();
};
