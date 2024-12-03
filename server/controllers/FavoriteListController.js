import {selectFavorites, insertFavorites } from "../models/FavoriteList.js";


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
        if (!req.body.description  || req.body.description.length === 0){
            const error = new Error('Invalid description for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await insertFavorites(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    }   catch (error) {
        return next(error)
    }
}

export { getFavorites, postFavorites }