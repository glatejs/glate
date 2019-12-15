import express from 'express';
import { createMiddleware } from './middleware';

export const createHttpServer = (httpHandler) => {
    const app = express();
    app.use(createMiddleware(httpHandler));
    return {
        listen: (port) => app.listen(port),
    };
};
