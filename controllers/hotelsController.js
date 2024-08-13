const Hotels=require("../models/Hotels");

exports.listHotels=async (req,res)=>{
    try{
    const hotels=await Hotels.find()
    .select('name location description');

    res.json(hotels);
    }
    catch(err){
        console.log("Error finding :", err);
    }
}