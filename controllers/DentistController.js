const Dentist = require('../models/Dentist');

const DentistController = {
    // Create a new dentist
    createDentist: async (req, res) => {
        console.log('Creating new dentist:', req.body.name);
        try {
            const { name, specialization, phoneNumber, email, username, password } = req.body;

            const newDentist = new Dentist({
                name,
                specialization,
                phoneNumber,
                email,
                username,
                password
            });

            const savedDentist = await newDentist.save();

            // Remove password from response
            const dentistResponse = savedDentist.toObject();
            delete dentistResponse.password;

            console.log('Dentist created successfully:', savedDentist._id);
            res.status(201).json({
                success: true,
                data: dentistResponse
            });
        } catch (error) {
            if (error.code === 11000) {
                console.error('Duplicate key error:', error.keyValue);
                return res.status(400).json({
                    success: false,
                    message: 'A dentist with this email or username already exists'
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
            const dentist = await Dentist.findById(id).select('-password');

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
            // Build filter object
            const filter = {};
            if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive name search
            if (email) filter.email = { $regex: email, $options: 'i' }; // Case-insensitive email search

            const skip = (pageNumber - 1) * pageSize;
            const total = await Dentist.countDocuments(filter);

            const dentists = await Dentist.find(filter)
                .select('-password')
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 });

            console.log(`Retrieved ${dentists.length} dentists out of ${total} total matching filters`);
            res.status(200).json({
                success: true,
                count: dentists.length,
                pagination: {
                    total,
                    pageNumber,
                    pageSize,
                    pages: Math.ceil(total / pageSize)
                },
                filters: { name, email },
                data: dentists
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