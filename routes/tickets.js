const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', ticketController.searchTickets);
router.post('/book', authMiddleware, ticketController.bookTicket);

module.exports = router;