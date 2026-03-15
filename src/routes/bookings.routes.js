const express = require('express');
const bookingsController = require('../controllers/bookings.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { bookingSchemas } = require('../utils/validationSchemas');

const router = express.Router();

// Create booking (authenticated users)
router.post('/', authenticate, validate(bookingSchemas.createBooking), bookingsController.createBooking);

// Get user's bookings (authenticated users)
router.get('/me', authenticate, bookingsController.getUserBookings);

// Get single booking (owner or admin)
router.get('/:id', authenticate, validate(bookingSchemas.getBooking), bookingsController.getBooking);

// Cancel booking (owner or admin)
router.patch('/:id/cancel', authenticate, validate(bookingSchemas.cancelBooking), bookingsController.cancelBooking);

module.exports = router;
