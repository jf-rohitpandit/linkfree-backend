const pool = require('../db')

const getUserByEmail = async (email) => {
    let query = `select email, password from public.user where email = '${email}'  `;
    let res = await pool.query(query);
    return res.rows[0];
}

const createUser = async (name, email, password) =>{
    let query = `insert into public.user (name, email, password) values ('${name}', '${email}', '${password}') returning id`;
    let res = await pool.query(query);
    return res.rows[0];
}

module.exports = {
    getUserByEmail
}