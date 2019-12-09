import { createHttpServer, useRoute, useParams, useResponse } from '@glate/http';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}`);
};

const app = () => {
    useRoute('/:name?', hello);
};

const server = createHttpServer(app);
server.listen(3000);
