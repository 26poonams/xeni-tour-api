const tourModel = require('../models/tourModel');
const {uuid} = require('uuidv4');
const reviewModel = require('../models/reviewModel')

// creating a new tour details
exports.create = async(req,res) => {
    try{
        const tourDetails = new tourModel({
            name:req.body.name,
            slug:req.body?.name.split(" ").join("-").toLowerCase()+"-"+uuid().toString(),
            duration:req.body.duration,
            maxGroupSize:req.body.maxGroupSize,
            averageRating:req.body.averageRating,
            price:req.body.price,
            description:req.body.description,
            image:req.body.image,
            userId:req.user.id
        })
        console.log(tourDetails);

        const data = await tourDetails.save();
        console.log(data);
        
        res.status(201).json({
            status:true,
            message:"tourDetails created successfully",
            body:data._doc
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "some error occured while creating details"
        });
    }
}

// Retrieve all details from database.
exports.findAll = async(req,res) => {
    try{
        const tours = await tourModel.find({userId:req.user.id})
        res.status(200).json(tours);
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}

// find a single tourDetails with an id
exports.findOne = async (req,res) => {
    try{
        const tourDetails = await tourModel.find({slug:req.params.slug});
        if(!tourDetails)throw new Error("Tour does not exist")
        const reviewDetails = await reviewModel.find({tourId:tourDetails._id});
        res.status(200).json({
            ...tourDetails._doc,review:reviewDetails
        });
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}

// Delete a user with the specified id in the request
exports.destroy = async (req,res) => {
    try{
        const tourDetails = await tourModel.findOneAndDelete({slug:req.params.slug,userId:req.user.id});
        if(!tourDetails)throw new Error("Tour does not exist")
        res.status(200).json({
            message:"details deleted successfully"
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

// update tour details using tour id
exports.update = async (req,res) => {
    try{
        const slug = req.params.slug;
        const tourDetails = await tourModel.findOne({slug});
        if(!tourDetails)throw new Error("Details does not exist")
        if(req.user.id!=tourDetails.userId)throw new Error("Access Denied")
        const data = await tourModel.findByIdAndUpdate(tourDetails._id,req.body,{useFindAndModify:false})
        res.status(201).json({
            status:true,
            message:"details updated successfully",
            body:data._doc
        })
    }catch(error){
        res.status(500).send({
            message:error.message
        })
    }
};




















