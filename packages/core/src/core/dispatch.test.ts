import { dispatch } from './dispatch';

describe('dispatch', () => {
    it('Set new handler context', async () => {
        const init = jest.fn();
        const handler = jest.fn();
        const finalize = jest.fn();

        await dispatch(handler, init, finalize);
        expect(init).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(finalize).toHaveBeenCalledTimes(1);
    });
});
