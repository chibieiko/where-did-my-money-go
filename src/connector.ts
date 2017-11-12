import Sequelize from 'sequelize';
import * as secret from '../secret.json';

// Initialize database.
export const db = new Sequelize(secret.databaseName, secret.username, secret.password, {
    host: 'mydb.tamk.fi',
    dialect: 'mysql',
});

db.authenticate()
    .then(() => {
    console.log("connection successful! :D");
})
.catch(err => {
    console.error('Connection failed:', err);
});