# Glate + React = ❤️

Glate is a simple yet powerful React-inspired library for Node.js backend development. Become a fullstack developer in minutes reusing your React skills.

## Why Glate?

- As simple as React is.
- Its' functional. Don't overengeneer your apps with OOP.
- Extensible, lightweight, and scalable.
- Ready for serverless cloud and local environment.
- Loves both monolithic and microservices architectures.
- Unit-testable and ready for CI/CD pipelines.
- Same skills for frontend and backend development.

## Installation

```bash
$ npm i @glate/core @glate/http
```

# Implement Your Backend API

## Create a Glate App

```js
// app.js
import { useRoute, useParams, useResponse } from '@glate/http';

export const app = () => {
    useRoute('/hello/:name?', hello);
};

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}!`);
};
```

## Run It Locally

```js
// server.js
import { createHttpServer } from '@glate/http';
import { app } from './app';

const server = createHttpServer(app);
server.listen(3000);
```

```bash
# Start our HTTP server
$ node server
```

```bash
# Make an HTTP GET request
$ curl http://localhost:3000/hello/glate
Hello glate!
```

## Unit Test It

```js
import { createMockServer } from '@glate/http';
import { app } from './app';

describe('hello', () => {
    it('should work', async () => {
        const server = createMockServer(app);
        const response = await server.get('/hello/glate');
        expect(response.body).toBe('Hello glate!');
    });
});
```

## Deploy It to AWS

Coming soon...

# Implement Your React Frontend

## Create a React Application

Coming soon...

## Run It Locally

Coming soon...

## Deploy It to AWS

Coming soon...

# License

MIT