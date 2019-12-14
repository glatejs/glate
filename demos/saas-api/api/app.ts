import 'reflect-metadata';

import { useRoute } from '@glate/http';
import { authHandler } from './handlers/auth';

// import { userHandler } from './handlers/user-handler';
// import { rootHandler } from './handlers/root-handler';
// import { noteHandler } from './handlers/note-handler';

export const httpHandler = () => {
    console.log('test2')
    useRoute('/auth', authHandler);
};
