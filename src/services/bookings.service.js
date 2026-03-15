const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

const createBooking = async (userId, bookingData) => {
  const { tripId, seats, paymentMethod } = bookingData;

  // First, check trip exists and get current data
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }

  // Check if seats are available (pre-check)
  const conflictingSeats = seats.filter(seat => trip.bookedSeats.includes(seat));
  if (conflictingSeats.length > 0) {
    throw new Error(`Seats already booked: ${conflictingSeats.join(', ')}`);
  }

  // Try to atomically add seats to bookedSeats
  const updatedTrip = await Trip.findOneAndUpdate(
    {
      _id: tripId,
      bookedSeats: { $nin: seats } // Ensure none of the requested seats are already booked
    },
    {
      $push: { bookedSeats: { $each: seats } } // Add all seats atomically
    },
    { new: true }
  );

  if (!updatedTrip) {
    // This means some seats were already booked (race condition)
    const currentTrip = await Trip.findById(tripId);
    const nowConflictingSeats = seats.filter(seat => currentTrip.bookedSeats.includes(seat));
    throw new Error(`Seats already booked: ${nowConflictingSeats.join(', ')}`);
  }

  // Calculate price
  const pricePerSeat = trip.price;
  const serviceFee = 2;
  const totalPrice = (pricePerSeat * seats.length) + serviceFee;

  // Create booking
  const booking = await Booking.create({
    userId,
    tripId,
    seats,
    pricePerSeat,
    serviceFee,
    totalPrice,
    paymentMethod,
  });

  return booking;
};

const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ userId })
    .populate('tripId')
    .sort({ createdAt: -1 });
  return bookings;
};

const getBookingById = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId).populate('tripId');
  if (!booking) {
    throw new Error('Booking not found');
  }

  // Check ownership (unless admin)
  if (booking.userId.toString() !== userId.toString()) {
    const user = await mongoose.model('User').findById(userId);
    if (!user || user.role !== 'admin') {
      throw new Error('Access denied');
    }
  }

  return booking;
};

const cancelBooking = async (bookingId, userId) => {
  // Get booking first
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  // Check ownership
  if (booking.userId.toString() !== userId.toString()) {
    const user = await mongoose.model('User').findById(userId);
    if (!user || user.role !== 'admin') {
      throw new Error('Access denied');
    }
  }

  // Check if can cancel (not completed)
  if (booking.status === 'completed') {
    throw new Error('Cannot cancel completed booking');
  }

  // Update booking status
  await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' });

  // Free up seats in trip (atomically remove seats)
  await Trip.findByIdAndUpdate(
    booking.tripId,
    {
      $pull: { bookedSeats: { $in: booking.seats } } // Remove the cancelled seats
    }
  );

  // Return updated booking
  return await Booking.findById(bookingId).populate('tripId');
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
};
