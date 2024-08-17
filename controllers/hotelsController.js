const Hotels=require("../models/Hotels");

exports.listHotels=async (req,res)=>{
    try{
    const hotels=await Hotels.find()
    .select('name location description url');

    res.json(hotels);
    }
    catch(err){
        console.log("Error finding :", err);
    }
}

exports.getHotel=async(req,res)=>{
    const {hotelId}=req.params;
    try{
        const hotel=await Hotels.findById(hotelId);
        res.send(hotel);
    }
    catch(err){
        res.send("Error finding hotel: ",err);
    }
}