const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

let sequelize;
if (env === 'production') {
    // Heroku database will be placed here in production
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    const config = require(__dirname + '/../config/config.json')[env];
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.url = require('./url')(sequelize, Sequelize)


module.exports = db;
