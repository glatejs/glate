import { httpHandler } from '../api/app';
import { createHttpServer } from '@glate/http';

const server = createHttpServer(httpHandler);
server.listen(3000);
