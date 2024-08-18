const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const flightRoutes = require('./routes/flights');
const hotelRoutes = require('./routes/hotels');
const reviewRouter = require('./routes/review');
const Flight = require('./models/Flight'); 
const Ticket = require('./models/Ticket'); 
const authMiddleware = require('./middleware/authMiddleware');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));


app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dashboard.html'));
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error('Error message:', err.message);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
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
