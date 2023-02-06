const dbConfig = require('../config/dbconfig');
const Sequelize = require('sequelize');

const sequelizeConfig = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        timezone: dbConfig.timezone,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};
db.sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;
db.content = require('./Content')(sequelizeConfig, Sequelize);

module.exports = db;