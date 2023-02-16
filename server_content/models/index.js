const dbConfig = require('../config/dbconfig');
const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');

const sequelizeConfig = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        timezone: dbconfig.timezone,
        operatorsAliases: false,
        dialectOptions: {
            charset: "utf8mb4",
            dateStrings: true,
            typeCast: true,
          },
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