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
    // Create dummydata if db is empty.
    db.user.findAll().then(result => {
        if (result.length === 0) {
            db.user.bulkCreate([
                {username: 'Cloud'},
                {username: 'Tifa'},
                {username: 'Yuffie'}
            ]);

            db.category.bulkCreate([
                {name: 'Food', userId: 1},
                {name: 'Travel', userId: 1},
                {name: 'Sweets', userId: 2},
                {name: 'Clothes', userId: 2},
                {name: 'Food', userId: 3},
                {name: 'Chocolate', userId: 3}
            ]);

            db.expense.bulkCreate([
                {price: 11.5, categoryId: 1, userId: 1},
                {price: 24, categoryId: 1, userId: 1},
                {price: 8.23, categoryId: 3, userId: 2},
                {price: 90, categoryId: 4, userId: 2},
                {price: 87, categoryId: 4, userId: 2},
                {price: 0.50, categoryId: 6, userId: 3},
                {price: 25, categoryId: 5, userId: 3},
            ]);
        }
    });

    app.listen(port, () => console.log('Server listening on port: %d', port));
});