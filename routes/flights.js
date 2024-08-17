const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const authMiddleware = require('../middleware/authMiddleware');

router.get("/search", flightController.searchFlights);
router.post("/book", authMiddleware, flightController.bookFlight);
router.post("/success",authMiddleware,flightController.successBook)

module.exports = router;
