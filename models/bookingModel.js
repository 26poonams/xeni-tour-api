const mongoose = require('mongoose');

const bookingSchrma = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tours",
        required: true,
    },
    price: {
        type:Number,
        required:true
    },
    payment:{
        type:String,
    }
},{
    timestamps:true
})

const booking = new mongoose.model('bookings',bookingSchrma);

module.exports =booking;