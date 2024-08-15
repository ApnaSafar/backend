const express=require('express');
const hotelController=require('../controllers/hotelsController');
const authMiddleware=require('../middleware/authMiddleware');
const reservationController=require('../controllers/reservationController');

const router=express.Router();

router.get('/',hotelController.listHotels);
router.get('/:hotelId',hotelController.getHotel);

//reservation
router.post('/reserv/create', authMiddleware, reservationController.createReservation);
router.get('/reserv/user', authMiddleware, reservationController.getUserReservations);

module.exports=router;