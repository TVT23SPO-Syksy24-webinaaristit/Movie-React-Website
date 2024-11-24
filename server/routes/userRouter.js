// import { pool } from '...'
import { Router } from 'express';
import { hash,compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const router = Router();

router.post('/register', async (req, res) => {
    hash(req.body.password, 10,(err, hashedpassword) => {
        if(error) next (error) //hash error
        try {
            pool.query('INSERT INTO ACCOUNT (email, password) VALUES ($1, $2) RETURNING *',
                [req.body.email, hashedpassword],
                (error, results) => {
                    if (error) return next(error) // Db error
                    return res.status(201).json({id: result.rows[0].id, email: result.rows[0].email})
                    }
                )
            } catch (error) {
                return next(error)
            }
        })
    })