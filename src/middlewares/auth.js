const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function (req, res, next) {
    // console.log(req.headers.cookie);
    const tokenString = req.headers.cookie;
    // console.log(tokenString)
    
    // console.log(token)

    try {
        const token = tokenString.replace('token=', '');
        const decoded = jwt.verify(token, 'shhhhh');
        const user = await User.find({_id: decoded.id});
        
        // if (!user) {
        //     throw new Error('User not found');
        // }
        next();
    } catch (error) {
        res.status(400).send(error = "No user Logged In");
    }
}