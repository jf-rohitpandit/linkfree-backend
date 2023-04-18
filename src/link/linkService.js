const {deflate} = require('zlib');
const {getLinksById} = require('./linkModel.js')


const getLinks = async (userId) =>{
    let result = {message:'', body: {}, status: 200};
    try {
        let links = getLinksById(userId);

        result.status = 200;
        result.message = 'success';
        result.body = {links}
    } catch (error) {
        console.log('error in the linkShortner: ', error);
        result.status = 500;
        result.message = 'Internal Error Occured!'
    }

    return result;
}


const linkShortner = async (link) =>{
    let result = {message:'', body: {}, status: 200};
    try {
        let shortLink =  deflate(link);

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

module.exports = {linkShortner, getLinks}