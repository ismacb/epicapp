// Fichero para conectarse a la base de datos 
const mysql = require('mysql');
const express = require('express');
const app = express();

// const dbConnection = async() => {
//     try {
//         var pool = await mysql.createPool({
//             host: process.env.HOST,
//             database: process.env.DATABASE,
//             user: process.env.USER,
//             password: ''
//         });

//     } catch (error) {
//         console.log(error);
//         throw new Error("Error al iniciar la BD");
//     }
// }

//module.exports = { dbConnection };

module.exports = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: ''
});