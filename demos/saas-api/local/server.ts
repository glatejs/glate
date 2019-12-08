import { httpHandler } from '../api/app';
import { createHttpServer } from '@glate/http';

const server = createHttpServer(httpHandler);
server.listen(3000);

createApp().then((app) => {
    app.listen(3000, () => console.log(`App is listening on port: 3000`));
});
