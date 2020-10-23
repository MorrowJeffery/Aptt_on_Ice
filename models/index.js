'use strict';

var fs = require('fs');
const path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var db = {};

// if (config.use_env_variable) {
//     var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//     var sequelize = new Sequelize(config.database, config.username, config.password, {
//         host: ``,
//         port: 5432,
//         logging: console.log,
//         maxConcurrentQueries: 100,
//         dialect: 'mysql',
//         dialectOptions: {
//             ssl:'Amazon RDS'
//         },
//         pool: { maxConnections: 5, maxIdleTime: 30},
//         language: 'en'
//     });
// }

var sequelize = new Sequelize('apt_on_ice_db', process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: `${process.env.DBENDPOINT}`,
    port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    dialectOptions: {
        // ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});

sequelize.authenticate().then(() => {
    console.log("Connection to DB established");
  }).catch(err => {
    console.log(err)
  })

fs
.readdirSync(__dirname)
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
})

db.sequelize = sequelize;
db.sequelize = sequelize;

module.exports = db;