# Glate

Glate is a simple functional Node.js framework. It aims to leverage your React skills to backend development.

## The Glate Story

Glate was borns as an alternative to NestJS (a powerful backend framework inspired by Angular). Unfortunately, NestJS has inherited all the over-engineering practices and complexity of Angular that are not acceptable for many React developers.

## The Principles Behind Glate

- React philosophy extended to the backend and the cloud.
- React-Glate-AWS as an alternative to  Angular-NestJS-Google.
- As simple as an event dispatcher.
- Agnostic to event sources and destinations.
- Agnostic to database engines.
- Extensibility in its core.
- Fast and stateless.
- Ready for serverless cloud and local environment.
- Unit-testable and ready for CI/CD pipelines.
- Built for monolithic and microservices architectures.

## How It Works

## A Sample API Based on Express.js

```bash
npm i @glate/core @glate/driver-express
```

```js
import express from 'express';
import { createServer } from '@glate/core';
import { createExpressDriver, useRouter, useParam } from '@glate/driver-express';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();
    setBody({ message: `Hello ${name}` });
};

const glateApp = () => {
    switchRoutes(
        route('/:name', hello)
    );
};

const main = () => {
    const app = express();
    const driver = createExpressDriver(app);
    createServer(driver, glateApp);
    app.listen(3000);
};

```