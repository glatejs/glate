import express from 'express';
import { createServer, useRequest, useResponse as useResponseCore } from '@glate/core';

export const useParams = () => {
    const req = useRequest();
    return req.params;
}

export const useParam = (paramName) => {
    const params = useParams();
    return params[paramName];
}

export const useResponse = () => {
    const res = useResponseCore();
    const setBody = (body) => {
        res.body = body;
    };
    return {
        setBody,
    };
}

export const createExpressEventDriver = (app) => {
    let eventHandler;
    app.use('/:test?', async (req, res, next) => {
        const respond = (response) => {
            console.log('\nRequest: ' + req.originalUrl);
            console.log('Response: ' + response);
            res.send(JSON.stringify(response.body));
        }
        await eventHandler(req, respond);
        next();
    });
    return {
        setEventHandler: (handler) => eventHandler = handler
    };
};

export const createExpressServer = (appHandler) => {
    const app = express();
    const driver = createExpressEventDriver(app);
    createServer(driver, appHandler);
    return {
        express,
        listen: (port) => {
            app.listen(port);
        }
    }
};
