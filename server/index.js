import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const { Pool } = pkg; // Destructure Pool from pg package

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: process.env.PG_USER,        // PostgreSQL username from .env
    host: process.env.PG_HOST,        // Database host from .env
    database: process.env.PG_DATABASE,// Database name from .env
    password: process.env.PG_PASSWORD,// PostgreSQL password from .env
    port: process.env.PG_PORT,        // PostgreSQL port from .env
  });

// API Endpoint to Get All Groups
app.get('/groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, description FROM groups');
    res.json(result.rows); // Return rows as JSON
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send({ error: 'Database query failed' });
  }

  app.get("/groups/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM groups WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).send("Group not found");
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching group details");
    }
  });
  
});

// Start the Server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
