import { Router } from "express"
import { postRegistration, postLogin, deleteAccount } from "../controllers/UserController.js"
import { auth } from '../helpers/auth.js';
const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);

router.delete("/delete/:id", auth, deleteAccount);

export default router;