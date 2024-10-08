const express = require('express');
const hotelController = require('../controllers/hotelsController');
const authMiddleware = require('../middleware/authMiddleware');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/', hotelController.listHotels);
router.get('/:hotelId', hotelController.getHotel);

//reservation
router.post('/reserv/create', authMiddleware, reservationController.createReservation);
router.post('/reserv/success', authMiddleware, reservationController.successReservation);
router.get('/reserv/user', authMiddleware, reservationController.getUserReservations);
router.put('/reserv/cancel/:reservId', authMiddleware, reservationController.cancelReservation);
router.get('/reserv/download/:reservId', authMiddleware, reservationController.downloadReservation);

module.exports = router;