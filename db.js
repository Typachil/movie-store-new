const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
    use_env_variable: "postgres://uoqdhcgrxklthu:2ef0fb1127bde460b3bd8584b29d4987977f415fae74c4203a317e9cc9af021c@ec2-52-71-69-66.compute-1.amazonaws.com:5432/dduqho72esquu1",
    dialect: 'postgresql',
    logging: false,
    dialectOptions: {
        ssl: {      /* <----- Add SSL option */
            require: true,
            rejectUnauthorized: false
        }
    },
});