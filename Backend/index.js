const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/configdb');
const { generarJWT } = require('./helpers/jwt');
const fileUpload = require('express-fileupload');
const multipart = require('connect-multiparty');

const fs = require('fs');


app.use(cors());
//app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());

app.use('/api/user', require('./routes/users'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/trainings', require('./routes/trainings'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/feedings', require('./routes/feedings'));
app.use('/api/foods', require('./routes/foods'));
app.use('/api/login', require('./routes/auth'));


const multipartMiddleware = multipart({
    uploadDir: '../Frontend/src/assets/images/posts'
});

app.post('/api/upload', multipartMiddleware, (req, res, next) => {

    let path = req.files.imagesetes.path;
    let archivos = req.files.imagesetes.name;
    // Reescribe el archivo
    fs.rename(path, `../Frontend/src/assets/images/posts/${archivos}`, () => {

    });

    res.json({
        'message': 'File uploaded succesfully.'
    });
});

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});