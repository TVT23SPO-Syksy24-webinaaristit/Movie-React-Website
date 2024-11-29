//This router exists just to test that auth.js works
import { pool } from '../helpers/db.js'
import { Router } from 'express';
import { auth } from '../helpers/auth.js';

const router = Router()

router.get('/test', auth, (req, res) => {
    pool.query('SELECT * FROM accounts', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        return res.status(200).json(results.rows)
    })
})

export default router;
