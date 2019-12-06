let activeRequestContext;

const activateContext = (requestContext) => {
    activeRequestContext = requestContext;
}

export const useActiveContext = () => activeRequestContext;

export const useRequest = () => {
    const context = useActiveContext();
    return context.request;
}

export const useResponse = () => {
    const context = useActiveContext();
    return context.response;
}

export const useState = (initialState?: any) => {
    const requestContext = useActiveContext();
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

export const useEffect = (callback, deps) => {
    const requestContext = useActiveContext();
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
        activateContext(requestContext);
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

const createRequestHandler = (userHandler) => async (request) => {
    const requestContext = {
        request,
        pendingEffects: [],
        effectDeps: {},
        states: [],
        currentStateIndex: 0,
        currentEffectIndex: 0,
    };
    activateContext(requestContext);
    const checkPendingEffects = () => {
        return requestContext.pendingEffects.length;
    };
    let response = userHandler();
    while (checkPendingEffects()) {
        await Promise.all(requestContext.pendingEffects);
        requestContext.currentStateIndex = 0;
        requestContext.currentEffectIndex = 0;
        response = userHandler();
    }
    return response;
};

export const createServer = (eventDriver, handler) => {
    const requestHandler = createRequestHandler(handler);
    eventDriver.setEventHandler(async (request, respond) => {
        const response = await requestHandler(request);
        respond(response);
    });
};