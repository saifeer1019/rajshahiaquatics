const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.NEXT_PUBLIC_SQL_DBNAME, process.env.NEXT_PUBLIC_SQL_USERNAME, process.env.NEXT_PUBLIC_SQL_PASSWORD, {
    host: process.env.NEXT_PUBLIC_SQL_HOST, // or your database host
    dialect:'mysql',
    dialectModule: require('mysql2'),
  });


  module.exports = sequelize;