const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const flightRoutes = require('./routes/flights');
const Flight = require('./models/Flight'); // Ensure this is correctly required

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/flights', flightRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/api/cities', async (req, res) => {
    try {
      const flights = await Flight.find({}, { from: 1, to: 1, _id: 0 });
      const cities = new Set();
      flights.forEach(flight => {
        cities.add(flight.from);
        cities.add(flight.to);
      });
      res.json(Array.from(cities));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cities' });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));