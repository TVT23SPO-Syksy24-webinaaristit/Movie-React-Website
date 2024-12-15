import { pool } from "../helpers/db.js";

const insertReview = async (userId, movieId, reviewText, reviewPoints) => {
    return await pool.query("INSERT INTO reviews (idmovie,review_text,review_points,review_creation_timestamp,accounts_idaccount) VALUES ($1,$2,$3,NOW(),$4) RETURNING *",[movieId,reviewText,reviewPoints,userId])
}

const getReviewsById = async (movieId) => {
    return await pool.query("SELECT reviews.idreview, reviews.review_text, reviews.review_points, reviews.review_creation_timestamp, accounts.username, accounts.idaccount AS accountid FROM reviews JOIN accounts ON reviews.accounts_idaccount = accounts.idaccount WHERE reviews.idmovie = $1",[movieId])
}

export { insertReview, getReviewsById };