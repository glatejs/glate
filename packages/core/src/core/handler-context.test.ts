import { useHandlerContext, activateHandlerContext } from './handler-context';

describe('activateHandlerContext and useHandlerContext', () => {
    it('should set and get context', () => {
        const context = {};

        expect(useHandlerContext()).not.toBe(context);

        activateHandlerContext(context);
        expect(useHandlerContext()).toBe(context);
    });
});
