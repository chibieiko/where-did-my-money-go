import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import {schema} from './src/schema';
import db from './src/models';

const app = express();
const port = 5000;

app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log('Server listening on port: %d', port));
});