import { Router } from "express"
import { postReview, getReviews } from "../controllers/ReviewsController.js";
import { auth } from '../helpers/auth.js';
const router = Router();

router.post("/add", auth, postReview);

router.get("/", getReviews);

export default router;