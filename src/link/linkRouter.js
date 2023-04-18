const express = require('express');
const {verifyUser} = require('../user/userMiddleware');
const router = express.Router();
const {linkShortner, getLinks} = require('./linkService.js')

router.get('/',verifyUser, async (req, res) =>{
    let result = {message:'', body: {}, status: 200};
    
    result = await getLinks(req.userId);
    return res.status(result.status).json({body: result.body, message: result.message})

})

router.get('*', async (req, res)=>{
    console.log(req.originalUrl)
    res.send('ok')

})

router.post('/link', async (req, res)=>{
    console.log('getting here')
    let {link} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!link){
        result.status = 400;
        result.message = 'Link is required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }

    result = await linkShortner(link);
    return res.status(result.status).json({body: result.body, message: result.message})
})

module.exports = router
