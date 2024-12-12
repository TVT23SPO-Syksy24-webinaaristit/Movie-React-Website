import {selectFavorites, insertFavorites, deleteFavoritesById} from "../models/FavoriteList.js";


const getFavorites = async (req,res,next) => {
    try {
        const result = await selectFavorites()
        return res.status(200)
    } catch (error) {
        return next(error)
    }
}

const postFavorites = async (req, res, next) => {
    try {
        const { idmovie, title, accounts_idaccount, poster_url } = req.body;

        // Validate required fields
        if (!idmovie || !title || !accounts_idaccount || !poster_url) {
            const error = new Error("Missing required fields: idmovie, title, or accounts_idaccount");
            error.statusCode = 400;
            return next(error);
        }

        // Call the model
        const result = await insertFavorites( idmovie, title, accounts_idaccount, poster_url);
        return res.status(200).json({ id: result.rows[0].id });//Unnecessary and annoying error?
    } catch (error) {
        console.error("Error in postFavorites:", error);
        return next(error);
    }
};

const deleteFavorites = async(req,res,next) => {
    try {
        if (!/^\d+$/.test(req.params.id)) return next(new ApiError("Invalid favorites ID. ID must be a positive integer",400))
        const id = parseInt(req.params.id)
        const result = await deleteFavoritesById(id)
        return res.status(200).json({id: id})
    } catch (error) {
        return next(error)
    }
}

export { getFavorites, postFavorites, deleteFavorites}