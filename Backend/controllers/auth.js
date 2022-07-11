const { response } = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
let pool = require('../database/configdb.js');

const login = async(req, res = response) => {

    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    pool.query("SELECT * FROM usuario WHERE email = ? and password = ?", [email, password],
        (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results);
        });

    // res.json({
    //     ok: true,
    //     msg: 'login',
    //     token: 'token'
    // });
}


//const { generarJWT } = require('../helpers/jwt');
//const jwt = require('jsonwebtoken');

// const token = async(req, res = response) => {

//     const token = req.headers['x-token'];

//     try {
//         const { uid, rol, ...object } = jwt.verify(token, process.env.JWTSECRET);

//         const userBD = await User.findById(uid);
//         if (!userBD) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Token no válido',
//                 token: ''
//             });
//         }
//         const rolBD = userBD.rol;

//         const new_token = await generarJWT(uid, rol);

//         res.json({
//             ok: true,
//             msg: 'Token',
//             uid: uid,
//             name: userBD.name,
//             email: userBD.email,
//             rol: rolBD,
//             networks: userBD.networks,
//             registerDate: userBD.registerDate,
//             active: userBD.active,
//             picture: userBD.picture,
//             activation_code: userBD.activation_code,
//             reviews: userBD.reviews.review,
//             CIF: userBD.CIF,
//             token: new_token
//         });
//     } catch {
//         return res.status(400).json({
//             ok: false,
//             msg: 'Token no válido',
//             token: ''
//         });
//     }
// }

// const login = async(req, res = response) => {

//     const { email, password } = req.body;

//     try {

//         const userBD = await User.findOne({ email });
//         if (!userBD) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Usuario o contraseña incorrecta',
//                 token: ''
//             });
//         }

//         const validPassword = bcrypt.compareSync(password, userBD.password);
//         if (!validPassword) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Usuario o contraseña incorrecta',
//                 token: ''
//             });
//         }

//         if (!userBD.active) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Tienes que verificar la cuenta de usuario para poder acceder al servicio',
//                 token: ''
//             });
//         }

//         const { _id, rol, name, picture } = userBD;
//         const token = await generarJWT(userBD._id, userBD.rol);

//         res.json({
//             ok: true,
//             msg: 'login',
//             uid: _id,
//             name,
//             rol,
//             picture,
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             ok: false,
//             msg: 'Error haciendo login',
//             token: ''
//         });
//     }

// }

module.exports = { login };