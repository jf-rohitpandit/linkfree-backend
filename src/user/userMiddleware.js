const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

const verifyUser =async (req, res, next) =>{
    try{
        let incomingToken  = req.headers['authorization'];
        console.log('req: ', req.headers)
        let {user:userId} = jwt.decode(incomingToken,'secretText');
        console.log("userId: ", userId)
        let user = await userModel.getUserById(userId);
        if(!user){
            return res.status(401).json({message: "Unauthorized access"})
        }
        console.log('user: ', user)
        req.userEmail = user.email;
        req.userId = userId
    } catch (error) {
        console.log('error in the verifyUser: ', error);
        error(next);
    }
    next();
}

module.exports = {
    verifyUser
}