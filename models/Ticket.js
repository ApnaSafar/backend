const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);