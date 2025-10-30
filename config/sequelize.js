const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'dentist_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connection Successful!');

        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('Tables created/verified successfully');
    } catch (error) {
        console.error('DB Connection Failed:', error);
        throw error;
    }
};

module.exports = { sequelize, connectDB };

