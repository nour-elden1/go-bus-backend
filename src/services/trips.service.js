const Trip = require('../models/Trip');

const getTrips = async (filters = {}, sortBy = 'departureTime') => {
  const query = {};

  if (filters.from) query.from = new RegExp(filters.from, 'i');
  if (filters.to) query.to = new RegExp(filters.to, 'i');
  if (filters.date) {
    const startDate = new Date(filters.date);
    const endDate = new Date(filters.date);
    endDate.setDate(endDate.getDate() + 1);
    query.date = { $gte: startDate, $lt: endDate };
  }

  let sortOptions = {};
  if (sortBy === 'price') sortOptions.price = 1;
  else if (sortBy === 'duration') sortOptions.durationMinutes = 1;
  else sortOptions.departureTime = 1;

  const trips = await Trip.find(query).sort(sortOptions);
  return trips;
};

const getTripById = async (tripId) => {
  const trip = await Trip.findById(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }
  return trip;
};

const createTrip = async (tripData) => {
  const trip = await Trip.create(tripData);
  return trip;
};

const updateTrip = async (tripId, updateData) => {
  const trip = await Trip.findByIdAndUpdate(tripId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!trip) {
    throw new Error('Trip not found');
  }
  return trip;
};

const deleteTrip = async (tripId) => {
  const trip = await Trip.findByIdAndDelete(tripId);
  if (!trip) {
    throw new Error('Trip not found');
  }
  return trip;
};

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
