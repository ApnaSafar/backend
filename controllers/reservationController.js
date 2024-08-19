const Reservation = require('../models/Reservation');
const Hotel = require('../models/Hotels');
const createCheckoutSession = require('../services/stripeSession');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { generateReservationPDF } = require('../services/pdfService');
const { sendReservationEmail } = require('../services/emailService');
const User = require('../models/User');
const { Types } = require('mongoose');



exports.createReservation = async (req, res) => {

    try {
        console.log(req.body);

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            console.log(req.user);
            return res.status(401).json({ message: 'User not authenticated' });

        }
        console.log(req.user, " ", req.user.id)
        const { hotelName, roomType, guests, checkIn, checkOut, price } = req.body;
        const hotel = await Hotel.findOne({ name: hotelName });
        const newReservation = new Reservation({
            user: req.user.id,
            hotel,
            roomType,
            guests,
            checkIn,
            checkOut,
            status: 'pending',
            hotelName
        });

        await newReservation.save();

        const room = hotel.roomTypes.find(rt => rt.type === roomType);

        const sessionId = await createCheckoutSession({
            amount: room.price * 100,
            description: `Hotel ${hotel.name} with Room Type ${roomType} from ${checkIn} to ${checkOut}`,
            ticketID: newReservation._id,
            type: "Reservation"
        })

        console.log(sessionId)
        res.status(201).json({ data: newReservation, sessionId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.successReservation = async (req, res) => {
    const session_id = req.body.sessionId;
    const product_id = req.body.productId;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === 'paid') {
            const reservation = await Reservation.findByIdAndUpdate(product_id, { status: 'booked' }, { new: true }).populate('hotel');

            // Generate PDF
            const { filePath } = await generateReservationPDF(reservation, req.user);

            // Send Email
            await sendReservationEmail(req.user, reservation, filePath);

            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Payment not successful" });
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

exports.getUserReservations = async (req, res) => {
    try {

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        console.log(req.user);
        const reservations = await Reservation.find({ user: new Types.ObjectId(req.user.id), status: 'booked' })
            .populate('_id hotelName checkIn checkOut status')
        console.log(reservations);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.cancelReservation = async (req, res) => {
    try {
        const { reservId } = req.params;
        const userId = req.user.id;

        console.log(reservId)
        const reserv = await Reservation.findOne({ _id: reservId, status: 'booked' });
        console.log(reserv)
        if (!reserv) {
            return res.status(404).json({ message: 'Ticket not found or already cancelled' });
        }

        const hotel = await Hotel.findById(reserv.hotel);
        if (!hotel) {
            return res.status(404).json({ message: 'Associated flight not found' });
        }

        reserv.status = 'cancelled';
        await reserv.save();

        res.json({ message: 'Reservation cancelled successfully', reserv });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.sendReservationEmail = async (userId, reservation) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Generate PDF
    const pdfPath = await generateReservationPDF(reservation, user);

    // Send email
    await sendReservationEmail(user, reservation, pdfPath);
};