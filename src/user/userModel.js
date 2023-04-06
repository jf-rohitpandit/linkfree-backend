const pool = require('../db')

const getUserByEmail = async (email) => {
    let query = `select email, password from public.user where email = '${email}'  `;
    let res = await pool.query(query);
    return res.rows[0];
}

module.exports = {
    getUserByEmail
}