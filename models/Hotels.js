const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    amenities: [String],
    roomTypes: [{
        type: { type: String, required: true },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true },
        available: { type: Number, required: true }
    }],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model("Hotels", hotelSchema);