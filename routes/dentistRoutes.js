const express = require('express');
const router = express.Router();
const DentistController = require( '../controllers/DentistController');

// Create a new dentist
router.post('/', DentistController.createDentist);

// Get a specific dentist by ID
router.get('/:id', DentistController.getDentistById);

// Get all dentists with pagination
router.get('/', DentistController.getAllDentists);

module.exports = router;