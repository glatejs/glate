import { useHandlerContext, activateHandlerContext } from '../core';
import { useState } from './state';

export const useEffect = (callback, deps?: any[]) => {
    const requestContext = useHandlerContext();
    const effectIndex = requestContext.currentEffectIndex;
    requestContext.currentEffectIndex++;

    const effectDeps = requestContext.effectDeps[effectIndex];
    const shouldRun = !deps
        || !effectDeps
        || deps.reduce((acc, value, index) => acc || (value !== effectDeps[index]), false);
    if (!shouldRun) {
        return;
    }
    requestContext.effectDeps[effectIndex] = deps;

    const pendingEffects = requestContext.pendingEffects;
    const effect = callback();
    effect.finally(() => {
        const jobIndex = pendingEffects.findIndex((item) => item === effect);
        pendingEffects.splice(jobIndex, 1);
        activateHandlerContext(requestContext);
    });
    pendingEffects.push(effect);
};

export const useAsync = (asyncFn) => (...args) => {
    const [ result, setResult ] = useState();
    useEffect(async () => {
        const value = await asyncFn(...args);
        setResult(value);
    }, [...args]);
    return result;
};
