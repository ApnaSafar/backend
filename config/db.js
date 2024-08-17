const mongoose = require("mongoose");
const Hotel=require('../models/Hotels');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
} catch (err) {
    console.error('MongoDB connection error:', err.message);
    //exiting the process
    process.exit(1);
}
};

module.exports = connectDB;
