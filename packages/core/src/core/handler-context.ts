let activeHandlerContext;

export const activateHandlerContext = (handlerContext) => {
    activeHandlerContext = handlerContext;
};

export const useHandlerContext = () => activeHandlerContext;
