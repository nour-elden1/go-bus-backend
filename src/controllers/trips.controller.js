const tripsService = require('../services/trips.service');
const ApiResponse = require('../utils/apiResponse');

const getTrips = async (req, res, next) => {
  try {
    const filters = {
      from: req.query.from,
      to: req.query.to,
      date: req.query.date,
    };
    const sortBy = req.query.sort || 'departureTime';

    const trips = await tripsService.getTrips(filters, sortBy);
    res.status(200).json(new ApiResponse(200, trips, 'Trips retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getTrip = async (req, res, next) => {
  try {
    const trip = await tripsService.getTripById(req.params.id);
    res.status(200).json(new ApiResponse(200, trip, 'Trip retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const createTrip = async (req, res, next) => {
  try {
    const trip = await tripsService.createTrip(req.body);
    res.status(201).json(new ApiResponse(201, trip, 'Trip created successfully'));
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const trip = await tripsService.updateTrip(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, trip, 'Trip updated successfully'));
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    await tripsService.deleteTrip(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Trip deleted successfully'));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
