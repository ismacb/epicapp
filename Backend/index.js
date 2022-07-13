const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/configdb');
const { generarJWT } = require('./helpers/jwt');
//const fileUpload = require('express-fileupload');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/user', require('./routes/users'));
app.use('/api/coaches', require('./routes/coaches'));
app.use('/api/customers', require('./routes/customers'));
//app.use('/api/posts', require('./routes/posts'));
app.use('/api/trainings', require('./routes/trainings'));
// app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/feedings', require('./routes/feedings'));
app.use('/api/foods', require('./routes/foods'));
app.use('/api/login', require('./routes/auth'));

// Abrir la aplicacíon en el puerto 3000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});