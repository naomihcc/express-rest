const Sequelize = require("sequelize");

require("dotenv").config();
DATABASE_HOST = process.env.DB_HOST;
DATABASE_PORT = process.env.DB_PORT;
DATABASE_NAME = process.env.DB_DATABASE;
DATABASE_USERNAME = process.env.DB_USERNAME;
DATABASE_PASSWORD = process.env.DB_PASSWORD;

const db = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: "postgres"
});


module.exports = db;