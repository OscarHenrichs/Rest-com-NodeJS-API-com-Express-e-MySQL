const mysql = require('mysql');
const dotenv = require('dotenv').config('../config/config.env');

const connectMySQL = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'agenda-petshop'
});

module.exports = connectMySQL;