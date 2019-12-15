import { useRoute } from './routing';
import { createMockServer } from '../testing';

describe('useRoute', () => {
    it('Set new handler context', async () => {
        const handler = jest.fn();
        const app = () => {
            useRoute('/hello', handler);
        };

        const server = createMockServer(app);
        const response = await server.get('/hello');
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
