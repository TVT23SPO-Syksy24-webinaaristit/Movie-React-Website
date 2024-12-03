import { pool } from "../helpers/db.js";
import {router} from "express"
import { auth } from "../helpers/auth.js";
import {getFavorites, postFavorites } from '../controllers/FavoriteListController.js'


const router = Router()

router.get('/getfavorites', getFavorites)
router.get('/insertfavorites', insertFavorites)