const bookingModel = require('../models/bookingModel');
const tourModel = require('../models/tourModel');
const stripeKey = require('../config/stripekey')
const stripe = require('stripe')(stripeKey.secretKey);

// creating a booking details
exports.create = async(req,res) => {
    try{
        const{tourId,paymentMethod}=req.body
        const tour = await tourModel.findById(tourId).populate("userId")
        if(!tour)throw new Error("tour does not exist")
        if(req.user.id === tour.userId.id)throw new Error("Access denied")

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(tour.price)*100,
            currency: 'usd',
            automatic_payment_methods: {
              enabled: true,
              allow_redirects:"never"
            },
        })
        const paymentConfirm = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
              payment_method: paymentMethod,
            }
          )
          if(paymentConfirm.status=="succeeded"){
            const payload={
                userId:req.user.id,
                tourId:tourId,
                price:tour.price,
                payment:paymentConfirm.id
            }
            const bookingDetails = new bookingModel(payload);
          const data =await bookingDetails.save();
          res.status(200).json({
            message:"Booking successful",
          })
          }
          else{
            res.status(400).send({
                message:"Something went wrong"
            })
          }
    }catch(error){
        res.status(500).send({
            message:error.message || "some error occured while booking"
        })
    }
}


// // Retrieve all booking from database.
// exports.findAll = async(req,res) => {
//     try{
//         const bookingDetails = await bookingModel.findAll();
//         res.status(200).json(user);
//     }catch(error){
//         res.status(404).json({
//             message:error.message
//         });
//     }
// }
