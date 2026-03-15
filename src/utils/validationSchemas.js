const { z } = require('zod');

const authSchemas = {
  signup: z.object({
    body: z.object({
      fullName: z.string().min(2, 'Full name must be at least 2 characters'),
      email: z.string().email('Invalid email format'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email('Invalid email format'),
      password: z.string().min(1, 'Password is required'),
    }),
  }),
};

const tripSchemas = {
  getTrips: z.object({
    query: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      date: z.string().optional(),
      sort: z.enum(['price', 'duration', 'departureTime']).optional(),
    }),
  }),

  getTrip: z.object({
    params: z.object({
      id: z.string().length(24, 'Invalid trip ID'),
    }),
  }),

  createTrip: z.object({
    body: z.object({
      operator: z.string().min(1, 'Operator is required'),
      from: z.string().min(1, 'From location is required'),
      to: z.string().min(1, 'To location is required'),
      fromTerminal: z.string().min(1, 'From terminal is required'),
      toTerminal: z.string().min(1, 'To terminal is required'),
      departureTime: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid departure time'),
      arrivalTime: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid arrival time'),
      date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
      durationMinutes: z.number().min(1, 'Duration must be at least 1 minute'),
      price: z.number().min(1, 'Price must be at least 1'),
      busType: z.string().min(1, 'Bus type is required'),
      amenities: z.array(z.string()).optional(),
      totalSeats: z.number().min(1, 'Total seats must be at least 1').optional(),
    }),
  }),

  updateTrip: z.object({
    params: z.object({
      id: z.string().length(24, 'Invalid trip ID'),
    }),
    body: z.object({
      operator: z.string().min(1).optional(),
      from: z.string().min(1).optional(),
      to: z.string().min(1).optional(),
      fromTerminal: z.string().min(1).optional(),
      toTerminal: z.string().min(1).optional(),
      departureTime: z.string().refine((val) => !isNaN(Date.parse(val))).optional(),
      arrivalTime: z.string().refine((val) => !isNaN(Date.parse(val))).optional(),
      date: z.string().refine((val) => !isNaN(Date.parse(val))).optional(),
      durationMinutes: z.number().min(1).optional(),
      price: z.number().min(1).optional(),
      busType: z.string().min(1).optional(),
      amenities: z.array(z.string()).optional(),
      totalSeats: z.number().min(1).optional(),
    }),
  }),

  deleteTrip: z.object({
    params: z.object({
      id: z.string().length(24, 'Invalid trip ID'),
    }),
  }),
};

const bookingSchemas = {
  createBooking: z.object({
    body: z.object({
      tripId: z.string().length(24, 'Invalid trip ID'),
      seats: z.array(z.number().min(1).max(40)).min(1).max(6, 'Maximum 6 seats per booking'),
      paymentMethod: z.enum(['card', 'cash']).optional(),
    }),
  }),

  getBooking: z.object({
    params: z.object({
      id: z.string().length(24, 'Invalid booking ID'),
    }),
  }),

  cancelBooking: z.object({
    params: z.object({
      id: z.string().length(24, 'Invalid booking ID'),
    }),
  }),
};

module.exports = {
  authSchemas,
  tripSchemas,
  bookingSchemas,
};
