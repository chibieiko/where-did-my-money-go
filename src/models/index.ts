import Sequelize from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

import * as secret from '../secret.json';

// Initialize database.
const sequelize = new Sequelize(secret.databaseName, secret.username, secret.password, {
    host: 'mydb.tamk.fi',
    dialect: 'mysql',
});

let db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

/*sequelize.authenticate()
    .then(() => {
        console.log("connection successful!");
    })
    .catch(err => {
        console.error('Connection failed:', err);
    });
    */