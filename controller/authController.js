const { Error } = require('mongoose');
const userModel = require('../models/userModel');
const Jwt = require('jsonwebtoken');
const jwtKey = require('../config/jwtconfig')

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            throw new Error("Payload missing");
        }
        const user = await userModel.findOne({email:email});
        if(user){
            throw new Error("User already exists with same email");
        }
        const hashPassword = bcrypt.hashSync(password,saltRounds);
        const newUser = new userModel({name,email,password:hashPassword});
        const register = await newUser.save();
        console.log(register);
        let payload = {
            user:{
                id:register._id
            }
        }

        console.log(payload);

        const token = Jwt.sign(payload,jwtKey.secret);
        console.log(token);

        res.status(201).json({
            status:true,
            message:"registered successfully",
            // body:(({ password, ...o }) => o)(register._doc)
            body:register._doc,
            token:token
        })

    }catch(error){
        res.status(500).json({
            message: `Error while signup ${error.message}`
        });
    }
}

exports.login = async (req,res) => {
    try{
        const {email,password}=req.body;
        
        const user = await userModel.findOne({email:email});
        
        if(!user){
            throw new Error("User does not exist");
        }
        const match = await bcrypt.compare(password,user.password);
        console.log(match);
        if(!match){
            throw new Error("Password is wrong");
        }

        const payload = {
            user:{
                id:user._id
            }
        }
        console.log(payload);

        const token = await Jwt.sign(payload, jwtKey.secret,{expiresIn:"2h"})
        console.log(token);

        res.status(200).json({
            status:true,
            mesaage:"Login successfully",
            body:(({ password, ...o }) => o)(user._doc),
            token:token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            mesaage:`Error while Login ${error.mesaage}`
        })
    }
}


// update user by id in th request
exports.update = async (req,res) => {
    try{
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user){
            throw new Error("User not found")
        }
        if(req.user.id!==user.id)throw new Error ("Access denied");
        const data = await userModel.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        res.status(201).json({
            status:true,
            message:"user updated successfully",
            body:(({ password, ...o }) => o)(data._doc)
        })
    }catch(error){
        res.status(500).send({
            message:error.message
        })
    }
};

// forget password
exports.forgetPassword = async (req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user)throw new Error("Email does not exists")
        const payload = {
            user:{
                id:user._id
            }
        }
        const token = await Jwt.sign(payload, jwtKey.secret,{expiresIn:"10m"})
        console.log(token);
        const data = await userModel.findByIdAndUpdate(user._id,{resetToken:token,expireToken:new Date()},{useFindAndModify:false})
        res.status(201).json({
            message:"mail sent successfully",
            url:"http://localhost:3000/api/auth/resetPassword/"+token
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


// verify password
exports.resetPassword = async (req,res) => {
    try{
        const token = req.params.token ;
        const decoded = Jwt.verify(token, jwtKey.secret);
        const user = await userModel.findById(decoded.user.id);
        if(!user){
            throw new Error ("Invalid user")
        }
        if(user.resetToken!=token)throw new Error("Invalid Token")
        const diff = new Date() - new Date(user.expireToken)
        if(diff>600000)throw new Error("token expired")
        const match = await bcrypt.compare(req.body.password,user.password);
        if(match)throw new Error("new password cannot be old password");
        const hashPassword = bcrypt.hashSync(req.body.password,saltRounds);
        const data = await userModel.findByIdAndUpdate(user._id,{resetToken:"",password:hashPassword},{useFindAndModify:false})
        res.status(201).json({
            message:"password updated sucessfully"
        })
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
