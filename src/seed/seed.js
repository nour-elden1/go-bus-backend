const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Trip = require('../models/Trip');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/go_bus');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Trip.deleteMany({});
    console.log('Cleared existing trips');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin12345!', 10);
      const admin = new User({
        fullName: 'Admin',
        email: 'admin@example.com',
        passwordHash: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('Created admin user: admin@example.com / Admin12345!');
    } else {
      console.log('Admin user already exists');
    }

    // Sample trip data
    const operators = ['Express Lines', 'City Connect', 'Premium Travel', 'Budget Bus'];
    const busTypes = ['AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC'];
    const amenitiesOptions = [
      ['wifi', 'usb', 'ac', 'toilet', 'snacks'],
      ['ac', 'usb'],
      ['wifi', 'ac'],
      ['wifi', 'usb', 'ac', 'toilet'],
    ];

    const trips = [];
    const today = new Date();

    for (let i = 0; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + Math.floor(Math.random() * 30)); // Next 30 days

      const departureHour = 6 + Math.floor(Math.random() * 16); // 6 AM to 10 PM
      const durationHours = 2 + Math.floor(Math.random() * 8); // 2-10 hours

      const departureTime = new Date(date);
      departureTime.setHours(departureHour, 0, 0, 0);

      const arrivalTime = new Date(departureTime);
      arrivalTime.setHours(departureHour + durationHours);

      const operator = operators[Math.floor(Math.random() * operators.length)];
      const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
      const amenities = amenitiesOptions[Math.floor(Math.random() * amenitiesOptions.length)];
      const price = 19 + Math.floor(Math.random() * 21); // $19-$39

      // Some booked seats for demo
      const bookedSeats = [];
      const numBooked = Math.floor(Math.random() * 15); // 0-14 seats
      for (let j = 0; j < numBooked; j++) {
        let seat;
        do {
          seat = Math.floor(Math.random() * 40) + 1; // 1-40
        } while (bookedSeats.includes(seat));
        bookedSeats.push(seat);
      }

      trips.push({
        operator,
        from: 'New York',
        to: 'Boston',
        fromTerminal: 'Port Authority',
        toTerminal: 'South Station',
        departureTime,
        arrivalTime,
        date,
        durationMinutes: durationHours * 60,
        price,
        busType,
        amenities,
        totalSeats: 40,
        bookedSeats,
      });
    }

    await Trip.insertMany(trips);
    console.log(`Seeded ${trips.length} trips`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

seedDatabase();
