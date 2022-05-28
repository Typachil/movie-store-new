const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize({
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgresql',
    logging: false,
    dialectOptions: {
        ssl: {      /* <----- Add SSL option */
            require: true,
            rejectUnauthorized: false
        }
    },
});