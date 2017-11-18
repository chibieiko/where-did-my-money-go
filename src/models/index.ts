let Sequelize = require('sequelize');
let fs = require('fs');
let path = require('path');

let secret = require('../../secret.json');


// Initialize database.
const sequelize = new Sequelize(secret.databaseName, secret.username, secret.password, {
    host: 'mydb.tamk.fi',
    dialect: 'mysql',
});

let db = {
    user: <any> null,
    category: <any> null,
    expense: <any> null,
    sequelize: <any> null,
    Sequelize: <any> null,
};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (path.extname(file) !== '.ts');
    })
    .forEach(file => {
        let model = sequelize.import(path.join(__dirname, '../models', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName] && 'associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;