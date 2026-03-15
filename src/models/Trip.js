const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  operator: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  fromTerminal: {
    type: String,
    required: true,
  },
  toTerminal: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  durationMinutes: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  busType: {
    type: String,
    required: true,
  },
  amenities: [{
    type: String,
  }],
  totalSeats: {
    type: Number,
    default: 40,
  },
  bookedSeats: [{
    type: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
