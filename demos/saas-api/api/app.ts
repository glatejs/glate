import 'reflect-metadata';

import { createHttpServer, useRoute, useParams, useResponse } from '@glate/http';
import { userHandler } from './handlers/user-handler';
import { rootHandler } from './handlers/root-handler';
import { authHandler } from './handlers/auth-handler';
import { noteHandler } from './handlers/note-handler';


const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}`);
};

export const httpHandler = () => {
    useRoute('/:name?', hello);
};
