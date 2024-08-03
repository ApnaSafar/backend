const Ticket = require('../models/Ticket');

exports.searchTickets = async (req, res) => {
    try {
        const { destination, date, minPrice, maxPrice } = req.query;
        
        let query = {};
        if (destination) query.destination = new RegExp(destination, 'i');
        if (date) query.date = new Date(date);
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const tickets = await Ticket.find(query);
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.bookTicket = async (req, res) => {
    try {
        const { ticketId } = req.body;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (!ticket.available) {
            return res.status(400).json({ message: 'Ticket is not available' });
        }

        ticket.available = false;
        await ticket.save();

        res.json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};