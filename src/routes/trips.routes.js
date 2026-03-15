const express = require('express');
const tripsController = require('../controllers/trips.controller');
const authenticate = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { tripSchemas } = require('../utils/validationSchemas');

const router = express.Router();

// Get all trips (public)
router.get('/', validate(tripSchemas.getTrips), tripsController.getTrips);

// Get single trip (public)
router.get('/:id', validate(tripSchemas.getTrip), tripsController.getTrip);

// Create trip (admin only)
router.post('/', authenticate, requireRole('admin'), validate(tripSchemas.createTrip), tripsController.createTrip);

// Update trip (admin only)
router.patch('/:id', authenticate, requireRole('admin'), validate(tripSchemas.updateTrip), tripsController.updateTrip);

// Delete trip (admin only)
router.delete('/:id', authenticate, requireRole('admin'), validate(tripSchemas.deleteTrip), tripsController.deleteTrip);

module.exports = router;
