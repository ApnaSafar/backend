const Ticket = require("../models/Ticket");
const Flight = require("../models/Flight");
const mongoose = require("mongoose");

exports.bookTicket = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(req.user,"",req.user.id);

    try {
        const { flightId } = req.body;
        console.log('Booking ticket for flight:', flightId);

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
    const tickets = await Ticket.find({ user: userId }).populate("flight");
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

    const ticket = await Ticket.findOne({
      _id: ticketId,
      user: userId,
      status: "booked",
    });
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket not found or already cancelled" });
    }

    const flight = await Flight.findById(ticket.flight);
    if (!flight) {
      return res.status(404).json({ message: "Associated flight not found" });
    }

    flight.seats += 1;
    await flight.save();

    ticket.status = "cancelled";
    await ticket.save();

    res.json({ message: "Ticket cancelled successfully", ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
