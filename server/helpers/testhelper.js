import { hash } from "bcrypt"
import { pool } from "./db.js"
import jwt from "jsonwebtoken"

const { sign } = jwt

const insertTestUser = async (username, email, password) => {
    const hashedPassword = await hash(password,10);
    const response = await pool.query("INSERT INTO accounts (username,email,password) VALUES ($1,$2,$3) RETURNING *",[username,email,hashedPassword]);
}

const getToken = (email) => {
    return sign({user: email},process.env.JWT_SECRET_KEY)
}

const deleteTestUser = async (email) => {
    const response = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
      if (!response.rows || response.rows.length === 0) return;
      const userId = response.rows[0].idaccount;
      await pool.query("CALL delete_account($1)", [userId]);
}

const insertTestReview = async (email, movieId, reviewText, reviewPoints) => {
    const response = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
    const userId = response.rows[0].idaccount;
    await pool.query("INSERT INTO reviews (idmovie,review_text,review_points,review_creation_timestamp,accounts_idaccount) VALUES ($1,$2,$3,NOW(),$4) RETURNING *",[movieId,reviewText,reviewPoints,userId]);
}

export { insertTestUser, insertTestReview, deleteTestUser, getToken }