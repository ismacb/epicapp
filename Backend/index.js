const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/configdb');
//const { generarJWT } = require('./helpers/jwt');
//const fileUpload = require('express-fileupload');

dbConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Conectado!!");
});

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});