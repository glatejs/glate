import { createExpressServer, useParams, useResponse } from '@glate/express';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();
    setBody({ message: `Hello ${name}` });
};

const glateApp = () => {
    //route('/:name', hello);
    hello();
};

const main = () => {
    const app = createExpressServer(glateApp);
    app.listen(3000);
};

main();