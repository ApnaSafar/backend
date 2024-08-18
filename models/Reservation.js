const mongoose=require('mongoose');
const User = require('./User');

const reservationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    hotel:{
        type:mongoose.Types.ObjectId,
        ref:"Hotels",
        requred:true,
    },
    roomType:{
        type:String,
        required:true,
    },
    guests:{
        type:Number,
        required:true,
    },
    checkIn:{
        type:Date,
        required:true,
    },
    checkOut:{
        type:Date,
        required:true,
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled', 'completed', 'pending'],
        default: "pending",
    }
});

module.exports=mongoose.model("Reservation", reservationSchema);