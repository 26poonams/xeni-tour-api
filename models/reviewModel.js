const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"tours",
        required: true,
    }
},{
    timestamps: true
})

const review = new mongoose.model('reviews',reviewSchema);

module.exports=review;