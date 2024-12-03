import { pool } from "../helpers/db.js";


const selectFavorites = async () => {
    return await pool.query('select * from favorites')
}

const insertFavorites = async(description) => {
    return await pool.query('insert into favorites (description) values ($1) returning *', [description])
}

export {selectFavorites, insertFavorites }