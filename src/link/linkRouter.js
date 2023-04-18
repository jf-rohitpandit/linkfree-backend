const express = require('express');
const {verifyUser} = require('../user/userMiddleware');
const router = express.Router();
const {linkShortner, getLinks, getOriginalUrl} = require('./linkService.js')


router.get('*', verifyUser, async (req, res)=>{
    console.log(req.originalUrl)
    let shortUrl = req.originalUrl;
    console.log('shorturl: ', shortUrl)
    let result = null;
    if(shortUrl == '/' ){
        result = await getLinks(req.userId);
    }else{
        result = await getOriginalUrl(shortUrl)
    }
    return res.status(result.status).json({body: result.body, message: result.message})
})


router.post('/', verifyUser, async (req, res)=>{
    console.log('getting here')
    let {link} = req.body;
    let result = {message:'', body: {}, status: 200};
    if(!link){
        result.status = 400;
        result.message = 'Link is required!'
        return res.status(result.status).json({body: result.body, message: result.message})
    }

    console.log("request: ", req)
    result = await linkShortner(link, req.userId);
    return res.status(result.status).json({body: result.body, message: result.message})
})


module.exports = router
