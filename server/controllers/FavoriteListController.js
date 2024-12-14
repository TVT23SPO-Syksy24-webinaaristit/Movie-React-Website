import {selectFavorites, insertFavorites, removeFavorites} from "../models/FavoriteList.js";


const getFavorites = async (req, res, next) => {
    try {
        // Log the query parameters and route parameters
        console.log("Query parameters:", req.query);
        console.log("Route parameters:", req.params);

        // Extract accounts_idaccount from query parameters
        const accounts_idaccount = req.query.accounts_idaccount || req.params.userid;

        if (!accounts_idaccount) {
            return res.status(400).json({ error: "Missing accounts_idaccount in query parameters." });
        }

        // Pass accounts_idaccount to the selectFavorites function
        const result = await selectFavorites(accounts_idaccount);

        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};


const postFavorites = async (req, res, next) => {
    try {
        const { idmovie, title, accounts_idaccount, poster_url } = req.body;

        // Validate required fields
        if (!idmovie || !title || !accounts_idaccount || !poster_url) {
            const error = new Error("Missing required fields: idmovie, title, accounts_idaccount, or poster_url");
            error.statusCode = 400;
            return next(error);
        }

        // Call the model
        const result = await insertFavorites(idmovie, title, accounts_idaccount, poster_url);

        // Return the inserted favorite or a confirmation message
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in postFavorites:", error);
        return next(error);
    }
};

const deleteFavorites = async (req, res, next) => {
    try {
      console.log("Received params:", req.params);
      console.log("Received query:", req.query);
  
      const { idmovie } = req.params;
      const { accounts_idaccount } = req.query;
  
      if (!idmovie || !accounts_idaccount) {
        return res.status(400).json({ error: "Invalid idmovie or accounts_idaccount." });
      }
  
      // Call the database query function
      const result = await removeFavorites(parseInt(idmovie), parseInt(accounts_idaccount));
  
      console.log("Query result:", result);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Favorite not found." });
      }
  
      return res.status(200).json({ idmovie });
    } catch (error) {
      console.error("Error in deleteFavorites:", error);
      return next(error);
    }
  };
  
  

export { getFavorites, postFavorites, deleteFavorites}