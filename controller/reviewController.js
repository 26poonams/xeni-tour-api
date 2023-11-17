const reviewModel = require('../models/reviewModel');
const tourModel = require('../models/tourModel');
const ObjectId = require('mongoose').Types.ObjectId;

// creating a new review details
exports.create = async(req,res) => {
    try{
        const tour = await tourModel.findOne({_id:new ObjectId(req.body.tourId),userId:req.user.id})
        if(!tour)throw new Error("tour does not exist")
        const reviewnDeatils = new reviewModel({
            review:req.body.review,
            rating:req.body.rating,
            userId:req.user.id,
            tourId:req.body.tourId
        })
        const data = await reviewnDeatils.save();
        res.status(201).json({
            status:true,
            message:"review added successfully",
            body:data._doc
        })
    }catch(error){
        res.status(500).send({
            message: error.message || "some error occured while adding review"
        })
    }   
}



// find a single review details with an id 
exports.findOne = async (req,res) => {
    try{
        const reviewDetails = await reviewModel.findById(req.params.id);
        res.status(200).json(reviewDetails);
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}

//Delete a review with the specified review id 
 exports.destroy = async (req,res) => {
    try{
        const reviewDetails = await reviewModel.findById(req.params.id);
        if(!reviewDetails)throw new Error("review does not exist")
        if(req.user.id!=reviewDetails.userId) throw new Error("Access Denied")
        const deleteReview = await reviewModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"review delete successfully"
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
 }

//update review details using review id
exports.update = async (req,res) => {
    try{
        const id = req.params.id;
        const reviewDetails = await reviewModel.findById(id);
        if(!reviewDetails)throw new Error("review does not exist")
        if(req.user.id!=reviewDetails.userId) throw new Error("Access Denied")
        const data = await reviewModel.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        res.status(201).json({
            status:true,
            message:"review updated successfully",
            body:data._doc
        })
    }catch(error){
        res.status(500).send({
            message:error.message
        })
    }
}