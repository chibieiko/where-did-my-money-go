import * as express from 'express';

const app = express();
const port = 5000;

app.listen(port, () => console.log('Server listening on port: %d', port));