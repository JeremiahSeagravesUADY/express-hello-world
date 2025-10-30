/**
 * Database Configuration - Sequelize ORM
 *
 * This file exports the Sequelize connection and connectDB function.
 * Sequelize handles:
 * - Connection pooling
 * - Table creation/synchronization
 * - Migrations (if you set them up)
 */

const { sequelize, connectDB } = require('./sequelize');

module.exports = { sequelize, connectDB };

// Note: For backward compatibility, you can also export pool
// but it's not needed with Sequelize
module.exports.pool = sequelize;
