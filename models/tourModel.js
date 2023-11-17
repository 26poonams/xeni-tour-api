var mongoose = require('mongoose');

var tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    slug: {
        type:String,
        required: true,
        unique: true
    },
    duration: {
        type:Number,
        required:true
    },
    maxGroupSize: {
        type:Number,
    },
    averageRating: {
        type:Number
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type: String
    },
    image :{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
},{
    timestamps:true
})

var tour = new mongoose.model('tours',tourSchema);

module.exports = tour;