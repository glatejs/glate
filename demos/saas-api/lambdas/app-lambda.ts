import serverless from 'serverless-http';
import { createApp } from '../api/app';

module.exports.handler = async (event: any, context: any) => {
    const app = await createApp();
    return serverless(app)(event, context);
};
