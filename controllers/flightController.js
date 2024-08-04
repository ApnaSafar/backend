const Flight = require('../models/Flight');


exports.searchFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        console.log('Query Parameters:', { from, to, date });
        
        let query = {};
        if (from) query.from = new RegExp(from, 'i');
        if (to) query.to = new RegExp(to, 'i');
        if (date) {
            // Parse the date from dd-mm-yyyy to yyyy-mm-dd
            const [day, month, year] = date.split('-').map(Number);
            const searchDate = new Date(Date.UTC(year, month - 1, day)); // Correctly create the Date object

            // Calculate start and end of the day
            const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999));

             // Log date boundaries
             console.log('Converted Start of Day:', startOfDay);
             console.log('Converted End of Day:', endOfDay);
 
            query.departureTime = {
                $gte: startOfDay, 
                $lt: endOfDay 
            };

        }
        

        console.log('MongoDB Query:', query);

        const flights = await Flight.find(query);
        console.log('Found Flights:', flights); // Log found flights
        res.json(flights);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.bookFlight = async (req, res) => {
    try {
        const { flightId } = req.body;
        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // Here you would typically create a booking record
        // For simplicity, we're just returning the flight details
        res.json({ message: 'Flight booked successfully', flight });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};