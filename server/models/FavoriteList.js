import { pool } from "../helpers/db.js";


const selectFavorites = async () => {
    return await pool.query('select * from favorites')
}

const insertFavorites = async ( idmovie, title, accounts_idaccount, poster_url) => {
    return await pool.query(
        `INSERT INTO favorites ( idmovie, title, accounts_idaccount, poster_url)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [ idmovie, title, accounts_idaccount, poster_url] // Ensure correct order
    );
};

const deleteFavoritesById = async(id) => {
    return await pool.query("delete from favorites where id = $1",[id])
}

export {selectFavorites, insertFavorites, deleteFavoritesById}