const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  seats: [{
    type: Number,
    required: true,
  }],
  pricePerSeat: {
    type: Number,
    required: true,
  },
  serviceFee: {
    type: Number,
    default: 2,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed', 'upcoming'],
    default: 'confirmed',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash'],
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
