const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

const verifyUser =async (req, res, next) =>{
    try{
        let incomingToken  = req.headers['authorization'];
        console.log('req: ', req.headers)
        let tokenRes = jwt.decode(incomingToken,'secretText');
        console.log('tokenREs: ', tokenRes)
        if(!tokenRes || ! tokenRes.user){
            req.userEmail = null;
            req.userId = null;
            next();
        }
        console.log("tokenRes: ", tokenRes)
        let user = await userModel.getUserById(tokenRes.user);
        if(!user){
            req.userEmail = null;
            req.userId = null;
            next();
        }
        console.log('user: ', user)
        req.userEmail = user.email;
        req.userId = tokenRes.user
    } catch (error) {
        console.log('error in the verifyUser: ', error);
        error(next);
    }
    next();
}

module.exports = {
    verifyUser
}