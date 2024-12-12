import { pool } from "../helpers/db.js";


const selectFavorites = async () => {
    return await pool.query('select * from favorites')
}

const insertFavorites = async (idmovie, title, accounts_idaccount, poster_url) => {
    // Check if the favorite already exists
    const existingFavorite = await pool.query(
        `SELECT * FROM favorites WHERE idmovie = $1 AND accounts_idaccount = $2`,
        [idmovie, accounts_idaccount]
    );

    if (existingFavorite.rows.length > 0) {
        // Favorite already exists, return the existing favorite
        return console.log("Favorite already exists");
    } else {
        // Insert the new favorite
        const newFavorite = await pool.query(
            `INSERT INTO favorites (idmovie, title, accounts_idaccount, poster_url)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [idmovie, title, accounts_idaccount, poster_url]
        );
        return newFavorite.rows[0];
    }
};
const deleteFavoritesById = async(id) => {
    return await pool.query("delete from favorites where id = $1",[id])
}

export {selectFavorites, insertFavorites, deleteFavoritesById}