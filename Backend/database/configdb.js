// Fichero para conectarse a la base de datos 
const mysql = require('mysql');

module.exports = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: ''
});