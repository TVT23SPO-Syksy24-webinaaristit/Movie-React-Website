import pkg from "pg";
import dotenv from "dotenv";

//db.js sets up connection to the database based on variables in server's env file 

//const environment = process.env.NODE_ENV;

dotenv.config();

const {Pool} = pkg;

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    //Project has two databases, one for testing the other for actual use
    //Which to use is determined by the command used when running the start script
    //database: process.env.NODE_ENV === "development" ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export { pool };