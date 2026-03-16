# Go Bus Backend API

Simple bus booking backend for frontend integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

Server runs on: `http://localhost:4000`

## 📚 API Endpoints

### Auth
```bash
# Signup
POST /api/auth/signup
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
# Response:
{
  "success": true,
  "statusCode": 201,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User created successfully"
}

# Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123!"
}
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}

# Get profile (requires token)
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User profile retrieved"
}
```

### Trips
```bash
# Get all trips
GET /api/trips
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "operator": "Express Lines",
      "from": "New York",
      "to": "Boston",
      "fromTerminal": "Port Authority",
      "toTerminal": "South Station",
      "departureTime": "2024-12-25T10:00:00.000Z",
      "arrivalTime": "2024-12-25T14:00:00.000Z",
      "date": "2024-12-25T00:00:00.000Z",
      "durationMinutes": 240,
      "price": 25,
      "busType": "AC Seater",
      "amenities": ["wifi", "ac"],
      "totalSeats": 40,
      "bookedSeats": [1, 2, 5]
    }
  ],
  "message": "Trips retrieved successfully"
}

# Get trips with filters
GET /api/trips?from=New%20York&to=Boston&sort=price

# Get single trip
GET /api/trips/{tripId}
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "operator": "Express Lines",
    "from": "New York",
    "to": "Boston",
    "fromTerminal": "Port Authority",
    "toTerminal": "South Station",
    "departureTime": "2024-12-25T10:00:00.000Z",
    "arrivalTime": "2024-12-25T14:00:00.000Z",
    "date": "2024-12-25T00:00:00.000Z",
    "durationMinutes": 240,
    "price": 25,
    "busType": "AC Seater",
    "amenities": ["wifi", "ac"],
    "totalSeats": 40,
    "bookedSeats": [1, 2, 5]
  },
  "message": "Trip retrieved successfully"
}

# Create trip (admin only)
POST /api/trips
Authorization: Bearer ADMIN_TOKEN
{
  "operator": "Bus Co",
  "from": "City A",
  "to": "City B",
  "departureTime": "2024-12-25T10:00:00.000Z",
  "arrivalTime": "2024-12-25T14:00:00.000Z",
  "date": "2024-12-25T00:00:00.000Z",
  "durationMinutes": 240,
  "price": 25,
  "busType": "AC Seater"
}
# Response:
{
  "success": true,
  "statusCode": 201,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
    "operator": "Bus Co",
    "from": "City A",
    "to": "City B",
    "fromTerminal": null,
    "toTerminal": null,
    "departureTime": "2024-12-25T10:00:00.000Z",
    "arrivalTime": "2024-12-25T14:00:00.000Z",
    "date": "2024-12-25T00:00:00.000Z",
    "durationMinutes": 240,
    "price": 25,
    "busType": "AC Seater",
    "amenities": [],
    "totalSeats": 40,
    "bookedSeats": []
  },
  "message": "Trip created successfully"
}
```

### Bookings
```bash
# Create booking
POST /api/bookings
Authorization: Bearer YOUR_TOKEN
{
  "tripId": "TRIP_ID",
  "seats": [1, 2],
  "paymentMethod": "card"
}
# Response:
{
  "success": true,
  "statusCode": 201,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "tripId": "65f1a2b3c4d5e6f7g8h9i0j2",
    "seats": [1, 2],
    "pricePerSeat": 25,
    "serviceFee": 2,
    "totalPrice": 52,
    "status": "confirmed",
    "paymentMethod": "card",
    "bookedAt": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Booking created successfully"
}

# Get my bookings
GET /api/bookings/me
Authorization: Bearer YOUR_TOKEN
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
      "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
      "tripId": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "operator": "Express Lines",
        "from": "New York",
        "to": "Boston",
        "departureTime": "2024-12-25T10:00:00.000Z",
        "price": 25
      },
      "seats": [1, 2],
      "totalPrice": 52,
      "status": "confirmed",
      "paymentMethod": "card",
      "bookedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Bookings retrieved successfully"
}

# Cancel booking
PATCH /api/bookings/{bookingId}/cancel
Authorization: Bearer YOUR_TOKEN
# Response:
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "status": "cancelled",
    "seats": [1, 2],
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "tripId": "65f1a2b3c4d5e6f7g8h9i0j2",
    "pricePerSeat": 25,
    "serviceFee": 2,
    "totalPrice": 52,
    "paymentMethod": "card"
  },
  "message": "Booking cancelled successfully"
}
```

### Health Check
```bash
GET /health
# Returns: {"ok": true}
```

## 🔑 Authentication

- Include `Authorization: Bearer YOUR_JWT_TOKEN` in headers for protected routes
- Admin routes require admin token (admin@example.com / Admin12345!)

## 📊 Response Format

**Success:**
```json
{
  "success": true,
  "data": { /* your data */ },
  "message": "Success message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🧪 Test Data

- **20 sample trips** between New York ↔ Boston
- **Admin user:** `admin@example.com` / `Admin12345!`
- **Test user:** Create your own via signup

## 🚀 Ready for Frontend!

Your React app can now connect to `http://localhost:4000/api/*` endpoints.
