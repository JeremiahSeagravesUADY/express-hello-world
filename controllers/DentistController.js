const Dentist = require('../models/Dentist');
const { ValidationError, UniqueConstraintError, Op } = require('sequelize');

const DentistController = {
    // Create a new dentist
    createDentist: async (req, res) => {
        console.log('Creating new dentist:', req.body.name);
        try {
            const { name, specialization, phoneNumber, email, username, password } = req.body;

            const dentist = await Dentist.create({
                name,
                specialization,
                phoneNumber,
                email,
                username,
                password
            });

            console.log('Dentist created successfully:', dentist.id);
            res.status(201).json({
                success: true,
                data: dentist.toJSON() // Automatically excludes password
            });
        } catch (error) {
            // Handle unique constraint violations
            if (error instanceof UniqueConstraintError) {
                const field = error.errors[0]?.path || 'field';
                console.error('Duplicate key error:', field);
                return res.status(400).json({
                    success: false,
                    message: `A dentist with this ${field} already exists`
                });
            }

            // Handle validation errors
            if (error instanceof ValidationError) {
                console.error('Validation error:', error.errors.map(e => e.message));
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(e => e.message)
                });
            }

            console.error('Error creating dentist:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error creating dentist',
                error: error.message
            });
        }
    },

    // Get dentist by ID
    getDentistById: async (req, res) => {
        const { id } = req.params;
        console.log('Fetching dentist by ID:', id);

        try {
            const dentist = await Dentist.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (!dentist) {
                console.log('Dentist not found with ID:', id);
                return res.status(404).json({
                    success: false,
                    message: 'Dentist not found'
                });
            }

            console.log('Dentist retrieved successfully:', id);
            res.status(200).json({
                success: true,
                data: dentist
            });
        } catch (error) {
            console.error('Error retrieving dentist by ID:', id, error.message);
            res.status(500).json({
                success: false,
                message: 'Error retrieving dentist',
                error: error.message
            });
        }
    },

    // Get all dentists with pagination
    getAllDentists: async (req, res) => {
        const pageNumber = parseInt(req.query.pageNumber) || parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || parseInt(req.query.limit) || 10;
        const { name, email } = req.query;

        console.log(`Fetching dentists - pageNumber:${pageNumber}, pageSize:${pageSize}, filters:`, { name, email });

        try {
            // Build where clause
            const where = {};
            if (name) {
                where.name = { [Op.like]: `%${name}%` };
            }
            if (email) {
                where.email = { [Op.like]: `%${email}%` };
            }

            const { count, rows } = await Dentist.findAndCountAll({
                where,
                attributes: { exclude: ['password'] },
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                order: [['createdAt', 'DESC']]
            });

            console.log(`Retrieved ${rows.length} dentists out of ${count} total matching filters`);
            res.status(200).json({
                success: true,
                count: rows.length,
                pagination: {
                    total: count,
                    pageNumber,
                    pageSize,
                    pages: Math.ceil(count / pageSize)
                },
                filters: { name, email },
                data: rows
            });
        } catch (error) {
            console.error('Error retrieving dentists:', error.message);
            res.status(500).json({
                success: false,
                message: 'Error retrieving dentists',
                error: error.message
            });
        }
    }
};

module.exports = DentistController;