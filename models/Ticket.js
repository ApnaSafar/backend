const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  passengerName: {
    type: String,
    required: true,
  },
  passengerEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: "booked",
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
