import { pool } from '../helpers/db.js'
import { Router } from 'express';
import { auth } from '../helpers/auth.js';

const router = Router()

router.get('/groups', auth, (req, res) =>{
    pool.query('SELECT id, name, description FROM GROUPS', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        return res.status(200).json(results.rows)
    })
})

// async (req, res) => {
//     try {
//       const result = await pool.query('SELECT id, title, description FROM groups');
//       res.json(result.rows); // Return rows as JSON
//     } catch (err) {
//       console.error('Error querying database:', err);
//       res.status(500).send({ error: 'Database query failed' });
//     }

export default router;