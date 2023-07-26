const { sequelize } = require("./connection")

const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database and tables synced successfully.');
    } catch (err) {
        console.error('Error syncing the database:', err);
    }
};

module.exports = syncDatabase;