const Sequelize = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_HOST } = require("../config/environment")

const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    '',
    {
        host: DB_HOST,
        dialect: 'mysql'
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

module.exports = { dbConnection, sequelize };