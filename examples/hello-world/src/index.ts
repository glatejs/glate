import express from 'express';
import { glate, useRoute, useParams, useResponse } from '@glate/express';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}`);
};

const handler = () => {
    useRoute('/:name?', hello);
};

const main = () => {
    const app = express();
    app.use(glate(handler))
    app.listen(3000);
};

main();