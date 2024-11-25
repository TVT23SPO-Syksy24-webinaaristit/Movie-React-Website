//import postgres
const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
});