import { pool } from "../helpers/db";
//User.js imports connection to database from helper db.js and includes queries related to registeration and login

const insertUser = async (username, email, hashedPassword) => {
    return await pool.query("INSERT INTO ACCOUNT (username,email,password) VALUES ($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
};

const selectUserByEmail = async (email) => {
    return await pool.query("SELECT FROM ACCOUNT WHERE EMAIL = $1",[email]);
};

export { insertUser, selectUserByEmail };