/**
 * Dentist Model - Sequelize ORM Implementation
 *
 * This module uses Sequelize ORM for data access and business logic.
 * Sequelize provides:
 * - Automatic schema management
 * - Built-in validation
 * - Password hashing via hooks
 * - Query building
 * - Associations/relations
 */

const Dentist = require('./Dentist.sequelize');

// Export the Sequelize model directly
// The model already has all methods: create, findByPk, findAll, update, destroy
module.exports = Dentist;