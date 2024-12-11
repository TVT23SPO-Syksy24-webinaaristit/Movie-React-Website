import { getReviewsById, insertReview } from "../models/Reviews.js";
import { ApiError } from "../helpers/ApiError.js";


//WIP need to add checks for data

const postReview = async(req,res,next) => {
    try {
        const reviewFromDb = await insertReview(parseInt(req.body.userid), parseInt(req.body.movieid), req.body.reviewtext, parseInt(req.body.reviewpoints));
        const review = reviewFromDb.rows[0];
        return res.status(200).json(createReviewObject(review.idreview, review.review_text, review.review_points, review.review_creation_timestamp, review.username));
    } catch(error) {
        return next(error);
    }
}

const getReviews = async(req,res,next) => {
    try {
        const movieId = parseInt(req.headers["movieid"],10); //get movieId from header
        const reviewsFromDb = await getReviewsById(movieId); //get all reviews with the id
        const reviewsArray = reviewsFromDb.rows.map(row => 
            createReviewObject(row.idreview, row.review_text, row.review_points, row.review_creation_timestamp, row.username)
        );
        console.log(reviewsArray);
        return res.status(200).json(reviewsArray)
    } catch(error) {
        return next(error);
    }
}

const createReviewObject = (reviewId, reviewText, reviewPoints, timestamp, username) => {
    return {
        "id":reviewId,
        "reviewText":reviewText,
        "reviewPoints":reviewPoints,
        "timestamp":timestamp,
        "author":username
    }
}

export { postReview, getReviews }