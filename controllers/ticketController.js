const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');
const mongoose = require('mongoose');
const { ticketMail } = require('../services/emailServices/emailService');
const pdfService = require('../services/pdfServices/pdfService');
const { ticketTemplate } = require('../services/pdfServices/ticketTemplate');

exports.bookTicket = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(req.user, "", req.user.id);

    try {
        //only flightId earlier
        const { flightId, seatNumber } = req.body;
        console.log('Booking ticket for flight:', flightId, 'Seat:', seatNumber);

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user.id;
        console.log('User ID:', userId);

        const flight = await Flight.findById(flightId).session(session);
        console.log('Found flight:', flight);

        if (!flight) {
            console.log('Flight not found');
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (flight.seats <= 0) {
            console.log('No seats available');
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'No seats available' });
        }

        // Decrement available seats and save
        flight.seats -= 1;

        await flight.save({ session });

        // Create a new ticket
        const ticket = new Ticket({
            user: userId,
            flight: flightId,
            seatNumber: `${flight.flightNumber}-${100 - flight.seats}`,
            status: 'booked'
        });
        await ticket.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log('Ticket booked successfully:', ticket);
        res.json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error booking ticket:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserTickets = async (req, res) => {
    try {
        const userId = req.user.id;
        const tickets = await Ticket.find({ user: userId, status: 'booked' }).populate("flight");
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.cancelTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const userId = req.user.id;

        const ticket = await Ticket.findOne({ _id: ticketId, user: userId, status: 'booked' });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or already cancelled' });
        }

        // checking if flight associated with ticket exists
        const flight = await Flight.findById(ticket.flight);
        if (!flight) {
            return res.status(404).json({ message: 'Associated flight not found' });
        }

        // restoeing the seat for the flight
        flight.seats += 1;
        await flight.save();

        // updatign ticket status to cancelled
        ticket.status = 'cancelled';
        await ticket.save();

        res.json({ message: 'Ticket cancelled successfully', ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.downloadTicket = async (req, res) => {

    await User.findById(new mongoose.Types.ObjectId(req.user))
        .then(async (user) => {
            console.log("User: ", user);

            const { name, email } = user;
            const { ticketId } = req.params;

            const ticket = await Ticket.findById(ticketId).select('flight seatNumber');
            const flight = await Flight.findById(ticket.flight);



            console.log(flight);
            const html = ticketTemplate(name, flight, ticket.seatNumber);

            res.send(html);

            //es.send(pdfBuffer);

            ticketMail(name, email, flight)
                .catch(console.err)

        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

    //res.send("hello");
};
