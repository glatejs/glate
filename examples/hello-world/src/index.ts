import express from 'express';
import { glate, useRouter, useParams, useResponse } from '@glate/express';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();
    setBody({ message: `Hello ${name}` });
};

const handler = () => {
    const { route } = useRouter();
    route('/:name', hello);
};

const main = () => {
    const app = express();
    app.use(glate(handler))
    app.listen(3000);
};

main();