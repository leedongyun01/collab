const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'collabmate',
    port: process.env.DB_PORT || 3306,
});

const promisePool = pool.promise();

module.exports = promisePool;
