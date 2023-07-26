const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');
const User = require('./user');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_activity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }
    }
});

module.exports = Log;