// routes/tickets.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/book', authMiddleware, ticketController.bookTicket);
router.get('/user', authMiddleware, ticketController.getUserTickets);
router.put('/cancel/:ticketId', authMiddleware, ticketController.cancelTicket);

module.exports = router;