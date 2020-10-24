'use strict';

var fs = require('fs');
const path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var config = require(__dirname + '/../config/config.js');
var db = {};

var sequelize = new Sequelize("apt_on_ice_db", process.env.DBUSERNAME, process.env.DBPASSWORD, {
            host: process.env.DBENDPOINT,
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