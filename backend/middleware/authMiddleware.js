const jwt = require('jsonwebtoken');
const User = require ('../model/userModel');
const asyncHandler = require('express-async-handler');
const JWT_SECRET = process.env.JWT_SECRET;

const protect = asyncHandler(async(req, res, next) => {
    var token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
       try {
           token = req.headers.authorization.split(' ')[1];
           const decoded = jwt.verify(token, JWT_SECRET);
           req.user = await User.findById(decoded.id).select('-password'); 
           next();
       } catch (error) {
           console.error(error);
           res.status(401)
           throw new Error ('You are not authorized!');
       }
    }
    if (!token) {
        res.status(401)
        throw new Error ('Not authorized, no token')
    } 
})

module.exports = { protect };