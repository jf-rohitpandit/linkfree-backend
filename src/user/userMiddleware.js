const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

const verifyUser = (req, res, next) =>{
    try{
        let incomingToken  = req.header['Authorization'];
        let userId = jwt.decode(incomingToken,'secretText');
        let user = await userModel.getUserById(userId);
        req.userEmail = user.email;
    } catch (error) {
        console.log('error in the verifyUser: ', error);
        error(next);
    }
    next();
}

module.exports = {
    verifyUser
}