const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/book', authMiddleware, packageController.bookPackage);
router.post('/success-book', authMiddleware, packageController.successBook);
router.get('/user-bookings', authMiddleware, packageController.getUserPackageBookings);
router.put('/cancel/:bookingId', authMiddleware, packageController.cancelBooking);

module.exports = router;