const bookingsService = require('../services/bookings.service');
const ApiResponse = require('../utils/apiResponse');

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingsService.createBooking(req.user.userId, req.body);
    res.status(201).json(new ApiResponse(201, booking, 'Booking created successfully'));
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await bookingsService.getUserBookings(req.user.userId);
    res.status(200).json(new ApiResponse(200, bookings, 'Bookings retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.id, req.user.userId);
    res.status(200).json(new ApiResponse(200, booking, 'Booking retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingsService.cancelBooking(req.params.id, req.user.userId);
    res.status(200).json(new ApiResponse(200, booking, 'Booking cancelled successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
};
