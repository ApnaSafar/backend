const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.searchFlights = async (req, res) => {
    try {

        const { from, to, date } = req.query;
        console.log('Query Parameters:', { from, to, date });
        
        let query = {};
        if (from) query.from = new RegExp(from, 'i');
        if (to) query.to = new RegExp(to, 'i');
        if (date) {

            // parsing the date from dd-mm-yyyy(input)to yyyy-mm-dd(backend)
            const [day, month, year] = date.split('-').map(Number);
            const searchDate = new Date(Date.UTC(year, month - 1, day)); 

            // start and end of the day
            const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999));

             //date boundaries
             console.log('Converted Start of Day:', startOfDay);
             console.log('Converted End of Day:', endOfDay);
 
            query.departureTime = {
                $gte: startOfDay, 
                $lt: endOfDay 
            };

        }
        

        console.log('MongoDB Query:', query);
        //found flights logging 
        const flights = await Flight.find(query);
        console.log('Found Flights:', flights); 
        res.json(flights);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.bookFlight = async (req, res) => {
    try {
        const { flightId} = req.body; // Seat number passed from the frontend
        
        //checking if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        const userId = req.user.id;
        console.log('User ID:', userId);

        const flight = await Flight.findById(flightId);
        console.log('Found flight:', flight);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (flight.seats <= 0) {
            return res.status(400).json({ message: 'No seats available' });
        }


        // Fetching user data
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       //starting session for transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        
        try {
            flight.seats -= 1;
            await flight.save({ session });

            //creating ticket (new)
            const ticket = new Ticket({
                user: userId,
                flight: flightId,
                flightNumber: flight.flightNumber,
                from: flight.from,
                to: flight.to,
                date: flight.departureTime,
                seatNumber: `${flight.flightNumber}-${100 - flight.seats}`,
                status: 'booked',
                passengerName: user.name,
                passengerEmail: user.email//req.user.email
            });

            await ticket.save({ session });

          //commiting the transaction
            await session.commitTransaction();
            session.endSession();

            console.log('Ticket booked successfully:', ticket);
            res.json({ message: 'Flight booked successfully', ticket });
        } catch (error) {
          //abort the transaction if error occurs
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        console.error('Error booking flight:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// exports.getFlightDetails = async (req, res) => {
//     try {
//         const flight = await Flight.findById(req.params.id);
//         if (!flight) {
//             return res.status(404).json({ message: 'Flight not found' });
//         }
//         res.json(flight);
//     } catch (error) {
//         console.error('Error fetching flight details:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
