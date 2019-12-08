let activeHandlerContext;

const activateHandlerContext = (handlerContext) => {
    activeHandlerContext = handlerContext;
}

export const useHandlerContext = () => activeHandlerContext;

export const useResponseState = () => {
    const context = useHandlerContext();
    return context.responseState;
}

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
        }
    ];
}

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
        }
    ];
}

export const useEffect = (callback, deps) => {
    const requestContext = useHandlerContext();
    const index = requestContext.currentEffectIndex;
    requestContext.currentEffectIndex++;

    const effectDeps = requestContext.effectDeps[index];
    const shouldRun = !deps
        || !effectDeps
        || deps.reduce((acc, value, index) => acc || (value !== effectDeps[index]), false);
    if (!shouldRun) {
        return;
    }
    requestContext.effectDeps[index] = deps;

    const pendingEffects = requestContext.pendingEffects;
    const effect = callback();
    effect.finally(() => {
        const jobIndex = pendingEffects.findIndex((item) => item === effect);
        pendingEffects.splice(jobIndex, 1);
        activateHandlerContext(requestContext);
    })
    pendingEffects.push(effect);
};

export const useAsync = (asyncFn) => (...args) => {
    const [ result, setResult ] = useState();
    useEffect(async () => {
        const result = await asyncFn(...args);
        setResult(result);
    }, [...args]);
    return result;
}

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
    } while(eventContext.pendingEffects.length);

    activateHandlerContext(lastPassContext);
    finalize();
};