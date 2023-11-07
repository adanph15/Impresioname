const { Sequelize } = require('sequelize');
const { database } = require('../config/config')

const sequelize = new Sequelize(
  database.DB,
  database.USER,
  database.PASSWORD,
  {
    host: database.HOST,
    dialect: database.dialect
  }
);

module.exports =  sequelize ;