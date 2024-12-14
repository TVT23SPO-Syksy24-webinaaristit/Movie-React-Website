import { Router } from "express"
import { postRegistration, postLogin, deleteAccount, getUserById } from "../controllers/UserController.js"
import { auth } from '../helpers/auth.js';
const router = Router();

router.post("/register", postRegistration);

router.post("/login", postLogin);

router.get("/delete/:id", auth, deleteAccount);

router.get("/:id", getUserById);

export default router;