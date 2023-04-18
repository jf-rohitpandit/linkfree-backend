const pool = require("../db");

const getLinksById = async (userId) => {
    let linksQuery = `select shortUrl from link where userId = '${userId}'`;
    let links = await pool.query(linksQuery);
    return links;
}

module.exports = { getLinksById}


