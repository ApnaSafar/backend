const Reservation = require('../models/Reservation');
const Hotel = require('../models/Hotels');
const createCheckoutSession=require('../services/stripeSession');
const stripe=require('stripe')(process.env.STRIPE_KEY);

exports.createReservation = async (req, res) => {
    
    try {
        console.log(req.body);

        if (!req.user || !req.user.id) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        console.log(req.user," ",req.user.id)
        const { hotelName, roomType, guests, checkIn, checkOut, price } = req.body;
        const hotel = await Hotel.findOne({ name: hotelName });
        const newReservation = new Reservation({
            user: req.user.id, 
            hotel:hotel._id,
            roomType,
            guests,
            checkIn,
            checkOut,
            status:'pending'
        });

        await newReservation.save();

        const room = hotel.roomTypes.find(rt => rt.type === roomType);

        const sessionId = await createCheckoutSession({
            amount: room.price*100,
            description: `Hotel ${hotel.name} with Room Type ${roomType} from ${checkIn} to ${checkOut}`,
            ticketID: newReservation._id,
            type: "Reservation"
        })

        console.log(sessionId)
        res.status(201).json({data:newReservation, sessionId});
    } catch (error) {
        res.status(400).json({message: error.message });
    }
};

exports.successReservation = async (req, res) => {
    const session_id=req.body.sessionId;
    const product_id=req.body.productId;
    console.log("here is session id and ticket id", session_id,product_id);

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === 'paid') {
            await Reservation.findByIdAndUpdate(product_id, { status: 'booked' })
            res.json({ success: true });
        }
        else {
            console.log("in else");
            res.json({ success: false, message: "Payment not successful" });
        }
    }
    catch (err) {
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

        const reservations = await Reservation.find({ user: req.user._id })
            .populate('hotel', 'name location');
        res.status(200).json({ data: reservations });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};