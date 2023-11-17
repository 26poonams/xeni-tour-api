const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ //object
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    resetToken: {
        type:String,
    },
    expireToken: {
        type:Date,
    }
},{
    timestamps:true
})

const user = new mongoose.model('users',userSchema);

module.exports = user;

//structure of each entity
//there many table in one database, for each model there is one table 