import {selectFavorites, insertFavorites, deleteFavoritesById} from "../models/FavoriteList.js";


const getFavorites = async (req, res, next) => {
    try {
      // Ensure the user is authenticated and their ID is available
      const userId = req.user.id;  // Assuming the auth middleware sets req.user.id
      if (!userId) {
        const error = new Error("User is not logged in.");
        error.statusCode = 401;
        return next(error);
      }
  
      // Pass the user ID to the model to fetch favorites
      const result = await selectFavorites(userId);
      
      if (result.rows.length > 0) {
        // Return the fetched favorites
        return res.status(200).json(result.rows);
      } else {
        // Handle case where no favorites are found
        return res.status(404).json({ message: "No favorites found for this user." });
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return next(error);
    }
  };


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
        return res.status(200)
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