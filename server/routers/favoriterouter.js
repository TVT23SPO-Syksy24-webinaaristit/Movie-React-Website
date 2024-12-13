import {Router} from "express"
import { auth } from "../helpers/auth.js";
import {getFavorites, postFavorites, deleteFavorites} from '../controllers/FavoriteListController.js'


const router = Router()


router.get('/getfavorites', auth,  getFavorites);

router.post('/postfavorites', auth,  postFavorites);

router.delete("/delete/:idmovie", deleteFavorites);


export default router;