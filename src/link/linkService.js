const zlib = require('zlib');
const {getLinksById, saveLink, getLinksByShortUrl} = require('./linkModel.js');
const util = require('util')
const deflate = util.promisify(zlib.deflate);

const getLinks = async (userId) =>{
    let result = {message:'', body: {}, status: 200};
    try {
        if(!userId){
            result.status = 401;
            result.message = 'Unauthorized access';
            return result;
        }
        let links =await getLinksById(userId);

        result.status = 200;
        result.message = 'success';
        result.body = {links}
    } catch (error) {
        console.log('error in the getLinks: ', error);
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}


const getOriginalUrl = async (shortUrl) => {
    let result = {message:'', body: {}, status: 200};
    try {
        console.log('shortUrl: ', shortUrl)
        let link = await getLinksByShortUrl(shortUrl);

        console.log("links: ", link)
        result.status = 200;
        result.message = 'success';
        result.body = {link}
    } catch (error) {
        console.log('error in the getOriginalUrl: ', error);
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}


const linkShortner = async ( link, userId) =>{
    let result = {message:'', body: {}, status: 200};
    try {
        let shortLinkBuffer = await deflate(link);
        console.log('shortLink: ', shortLinkBuffer);
        let shortLink  ='/'+ shortLinkBuffer.toString('base64');

        await saveLink(link, shortLink, userId)
        result.status = 200;
        result.message = 'link added successfully!';
        result.body = {shortLink}
    } catch (error) {
        console.log('error in the linkShortner: ', error);
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}

module.exports = {linkShortner, getLinks, getOriginalUrl}