// Fichero para conectarse a la base de datos 
const mysql = require('mysql');

const dbConnection = async() => {
    try {
        await mysql.createConnection({
            host: process.env.HOST,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: ''
        });
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la BD");
    }
}

module.exports = { dbConnection };