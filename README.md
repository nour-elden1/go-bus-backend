# Go Bus Backend

A Node.js Express backend for a bus ticket booking app with MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)

## How to Run MongoDB Locally

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - On Windows: `net start MongoDB`
   - On macOS: `brew services start mongodb/brew/mongodb-community`
   - On Linux: `sudo systemctl start mongod`

## Installation

1. Clone the repository and navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup Environment

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` file and set your own values (default values are fine for local development):
   - PORT=4000
   - MONGODB_URI=mongodb://127.0.0.1:27017/go_bus
   - JWT_SECRET=your_jwt_secret_key_here
   - CORS_ORIGIN=http://localhost:5173

## Seed Database

Run the seed script to populate the database with sample data:
```bash
npm run seed
```

## Run the Application

Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:4000 (or the PORT you set).

## Test with cURL

### 1. Health Check
```bash
curl http://localhost:4000/health
```

### 2. Signup
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```
Copy the `token` from the response.

### 4. List Trips
```bash
curl "http://localhost:4000/api/trips?from=New%20York&to=Boston"
```

### 5. Create Booking
Replace `YOUR_TOKEN` with the token from login:
```bash
curl -X POST http://localhost:4000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tripId": "TRIP_ID_HERE",
    "seats": [1, 2],
    "paymentMethod": "card"
  }'
```

### 6. List My Bookings
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:4000/api/bookings/me
```
