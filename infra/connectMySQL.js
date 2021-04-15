const mysql = require('mysql');

const connectMySQL = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'agenda-petshop'
});

module.exports = connectMySQL;