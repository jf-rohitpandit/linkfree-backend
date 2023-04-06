const express = require("express");
const userService = require('./userService.js')
const router = express.Router();

router.post('/login', async (req, res)=>{
    let {email, password} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!email || !password){
        result.status = 400;
        result.message = 'Email and Passwords are required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }
    
    result = await userService.login(email, password);
    return res.status(result.status).json({body: result.body, message: result.message})
})


router.post('/signup', async (req, res)=>{
    let {name, email, password} = req.body;
    let result = {message: '', body: {}, status: 200};
    if(!name || !email || !password){
        result.status = 400;
        result.message = 'Name, Email and Passwords are required!';
        return res.status(result.status).json({body: result.body, message: result.message});
    }

    result = await userService.signup(name, email, password);
    return res.status(result.status).json({body: result.body, message: result.message})
})

module.exports = router;