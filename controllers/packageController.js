const Package = require('../models/Package');
const PackageBooking = require('../models/PackageBooking');
const createCheckoutSession = require('../services/stripeSession');
const stripe = require('stripe')(process.env.STRIPE_KEY);


exports.getUserPackageBookings = async (req, res) => {
    try {
        const bookings = await PackageBooking.find({ user: req.user.id })
            .populate('package')
            .sort({ bookingDate: -1 });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user package bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.bookPackage = async (req, res) => {
    try {
        const { packageId } = req.body;
        const userId = req.user.id;

        const package = await Package.findOne({ packageId: packageId });
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const booking = new PackageBooking({
            user: userId,
            package: package._id,
            status: 'pending'
        });

        await booking.save();

        const sessionId = await createCheckoutSession({
            type: "Package",
            amount: package.price,
            description: `Package: ${package.name}`,
            ticketID: booking._id.toString()
        });

        res.json({ sessionId });
    } catch (error) {
        console.error('Error booking package:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.successBook = async (req, res) => {
    const { sessionId, productId } = req.body;

    if (!sessionId || !productId) {
        return res.status(400).json({ success: false, message: 'Missing sessionId or productId' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const updatedBooking = await PackageBooking.findByIdAndUpdate(productId, { 
                status: 'confirmed',
                stripeSessionId: sessionId
            }, { new: true });

            if (updatedBooking) {
                res.json({ success: true, message: 'Booking confirmed successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Payment not completed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await PackageBooking.findById(req.params.bookingId);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
        }

        if (booking.status !== 'confirmed') {
            return res.status(400).json({ success: false, message: 'Can only cancel confirmed bookings' });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({ success: true, message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};