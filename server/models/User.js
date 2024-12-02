import { pool } from "../helpers/db.js";
//User.js imports connection to database from helper db.js and includes queries related to registeration and login

const insertUser = async (username, email, hashedPassword) => {
    return await pool.query("INSERT INTO accounts (username,email,password) VALUES ($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
};

const selectUserByEmail = async (email) => {
    return await pool.query("SELECT * FROM accounts WHERE email = $1",[email]);
};

const deleteUserById = async(id) =>{
    return await pool.query("DELETE FROM favorites WHERE accounts_idaccount=$1",[id]);
}

export { insertUser, selectUserByEmail, deleteUserById };