const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email : {type: DataTypes.STRING, unique: true},
  password : {type: DataTypes.STRING},
  name: {type: DataTypes.STRING, allowNull: false},
  role : {type: DataTypes.STRING, defaultValue: "USER"}
})

const History = sequelize.define('history', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const HistoryFilms = sequelize.define('historyfilms', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Film = sequelize.define('film', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.FLOAT, defaultValue: 0},
  video: {type: DataTypes.STRING, allowNull: false},
  description : {type: DataTypes.STRING(1234), allowNull: false}
})

const Category = sequelize.define('category', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Type = sequelize.define('type', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define('rating', {
  id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rate: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasOne(History);
History.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

History.hasMany(HistoryFilms);
HistoryFilms.belongsTo(History);

Category.hasMany(Film);
Film.belongsTo(Category);

Type.hasMany(Film);
Film.belongsTo(Type);

Film.hasMany(Rating);
Rating.belongsTo(Film);

Film.hasMany(HistoryFilms);
HistoryFilms.belongsTo(Film);

module.exports = {
  User,
  History,
  HistoryFilms,
  Film,
  Category,
  Rating,
  Type
}
