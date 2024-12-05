import { pool } from "../helpers/db.js";


const selectFavorites = async () => {
    return await pool.query('select * from favorites')
}

const insertFavorites = async(idfavorite, idmovie, title, account_idaccount) => {
    return await pool.query('insert into favorites (idfavorite, idmovie, title, account_idaccount) values ($1, $2, $3, $4) returning *', [idfavorite, idmovie, title, account_idaccount])
}

const deleteFavoritesById = async(id) => {
    return await pool.query("delete from favorites where id = $1",[id])
}

export {selectFavorites, insertFavorites, deleteFavoritesById}