const pool = require("../db");

const getLinksById = async (userId) => {
    let linksQuery = `select shortUrl from link where userId = '${userId}'`;
    let links = await pool.query(linksQuery);
    return links.rows;
}


const getLinksByShortUrl = async (shortUrl) =>{
    let linkQuery = ` select originalUrl from link where shortUrl = '${shortUrl}' `;
    console.log('linkQuery:: ', linkQuery)
    let link = await pool.query(linkQuery);
    return link.rows[0];
}


const saveLink = async (originalUrl, shortUrl, userId) => {
    let saveLinkQuery = `insert into link (originalUrl, shortUrl, userId) values
        ('${originalUrl}', '${shortUrl}', ${userId} ) `;
    await pool.query(saveLinkQuery)
}

module.exports = { getLinksById, getLinksByShortUrl, saveLink}


