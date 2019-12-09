# Glate + React + AWS = ❤️

Glate is a simple yet powerful functional Node.js framework. It aims to leverage your existing React skills to backend development and the AWS Cloud.

## Why Glate?

- Functional - don't overcomplicate your apps with OOP.
- Extensible and lightweight by design.
- Ready for serverless cloud and local environment.
- Loves both monolithic and microservices architectures.
- Unit-testable and ready for CI/CD pipelines.
- Same skills for frontend and backend development.
- Seamlessly integrated with AWS services.

## Getting Started

### Installation

```bash
$ npm i @glate/core @glate/http
```

### Implement Your Backend API

```js
// app.js
import { useRoute, useParams, useResponse } from '@glate/http';

const hello = () => {
    const { name } = useParams();
    const { setBody } = useResponse();

    setBody(`Hello ${name}!`);
};

export const app = () => {
    useRoute('/:name?', hello);
};
```

### Test It Locally

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
$ curl http://localhost:3000/glate
Hello glate!
```
