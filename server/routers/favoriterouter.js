import {router} from "express"
import { auth } from "../helpers/auth.js";
import {getFavorites, postFavorites, deleteFavorites} from '../controllers/FavoriteListController.js'


const router = Router()


router.get('/getfavorites', getFavorites);

router.post('/postfavorites', auth,  postFavorites);

router.delete("/delete/:id", deleteFavorites);