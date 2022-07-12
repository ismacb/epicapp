const jwt = require('jsonwebtoken');

const generarJWT = (uid, rol) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            rol
        }
        jwt.sign(payload, 'miclavesecreta', {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}
module.exports = { generarJWT };