const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Text: {
    type: String,
    required: true,
  } 
});


module.exports = mongoose.model("Review", ReviewSchema);
