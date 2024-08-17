const express = require("express");
const Review = require("../models/Review"); // Import the Review model

const router = express.Router();

router.post("/add-review", async (req, res) => {
  try {
    const { Name, Text } = req.body;
    const newReview = new Review({ Name, Text });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    console.error('Error saving review:', error); // Log the error
    res.status(500).json({ message: "Failed to add review", error: error.message }); // Send error message to frontend
  }
});



router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
});
module.exports = router;
