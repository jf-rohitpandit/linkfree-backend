const express = require('express');
const {verifyUser} = require('../user/userMiddleware');
const router = express.Router();

router.get('*', async (req, res)=>{
    res.status(200);
})

router.post('/link', async (req, res)=>{
    let {link} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!link){
        result.status = 400;
        result.message = 'Link is required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }

    result = await 
})
