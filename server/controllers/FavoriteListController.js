import {selectFavorites, insertFavorites, deleteFavoritesById} from "../models/FavoriteList.js";


const getFavorites = async (req,res,next) => {
    try {
        const result = await selectFavorites()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

const postFavorites = async(req,res,next) => {
    try {
        if (!req.body){
            const error = new Error('error in controller', error)
            error.statusCode = 400
            return next(error)
        }
        const result = await insertFavorites(req.body)
        return res.status(200).json({id: result.rows[0].id})
    }   catch (error) {
        return next(error)
    }
}

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