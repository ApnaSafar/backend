const Reservation = require('../models/Reservation');
const Hotel = require('../models/Hotels');

exports.createReservation = async (req, res) => {
    try {

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { hotel, roomType, guests, checkIn, checkOut } = req.body;
        const newReservation = new Reservation({
            user: req.user._id, 
            hotel,
            roomType,
            guests,
            checkIn,
            checkOut
        });

        await newReservation.save();
        res.status(201).json({data:newReservation});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
};

exports.getUserReservations = async (req, res) => {
    try {

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const reservations = await Reservation.find({ user: req.user._id })
            .populate('hotel', 'name location');
        res.status(200).json({ data: reservations });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};