const pool = require("../db");

const getLinksById = async (userId) => {
    let linksQuery = `select shorturl from link where userid = '${userId}'`;
    let links = await pool.query(linksQuery);
    return links.rows;
}


const getLinksByShortUrl = async (shortUrl) =>{
    let linkQuery = ` select originalurl from link where shorturl = '${shortUrl}' `;
    console.log('linkQuery:: ', linkQuery)
    let link = await pool.query(linkQuery);
    return link.rows[0];
}


const saveLink = async (originalUrl, shortUrl, userId) => {
    let saveLinkQuery = `insert into link (originalurl, shorturl, userid) values
        ('${originalUrl}', '${shortUrl}', ${userId} ) `;
    await pool.query(saveLinkQuery)
}

module.exports = { getLinksById, getLinksByShortUrl, saveLink}


