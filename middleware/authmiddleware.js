const Jwt = require("jsonwebtoken");
const UserModel = require('../models/userModel');
const jwtKey = require("../config/jwtconfig");

const isLoggedIn = async (req, res, next) => {
    const token = req.header("x-auth-token");

    try {
        if(!token){
            throw new Error("token does not exist")
        }
        const decoded = Jwt.verify(token, jwtKey.secret);
        const user = await UserModel.findById(decoded.user.id);
        if(!user){
            throw new Error ("Invalid user")
        }
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({
            code: 401,
            message:err.message || "Access denied!",
        });
    }
};

module.exports = isLoggedIn;