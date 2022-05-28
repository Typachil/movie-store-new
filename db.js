const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.DATABASE_URL,{dialectOptions: {
    ssl: {      /* <----- Add SSL option */
        require: true,
        rejectUnauthorized: false
    }
}})