import { createHttpServer, useRoute, useParams, useResponse } from '@glate/http';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}`);
};

const httpHandler = () => {
    useRoute('/:name?', hello);
};

const main = () => {
    const server = createHttpServer(httpHandler);
    server.listen(3000);
};

main();