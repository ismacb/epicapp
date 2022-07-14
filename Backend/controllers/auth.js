const bcrypt = require('bcryptjs');
let pool = require('../database/configdb.js');
const { generarJWT } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");

//Funcion de login, hacer select y comparar la contraseña devolviendo el token
const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        pool.query("SELECT * FROM usuario WHERE email = ?", [email],
            async function(error, results) {
                if (error)
                    throw error;
                if (results.length === 0) {
                    return res.status(200).json({
                        ok: false,
                        msg: "Usuario o contraseña incorrectos",
                        token: "",
                    });
                } else {
                    if (results[0]) {
                        const validPassword = bcrypt.compareSync(
                            password,
                            results[0].password
                        );
                        if (!validPassword) {
                            return res.status(200).json({
                                ok: false,
                                msg: "Usuario o contraseña incorrectos",
                                token: "",
                            });
                        } else {
                            return res.json({
                                ok: true,
                                msg: "login",
                                id: results[0].id,
                                rol: results[0].rol,
                                nombre: results[0].nombre,
                                email: results[0].email,
                                token: await generarJWT(results[0].id, results[0].rol, results[0].email),
                            });
                        }

                    }

                }
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en el login",
            token: "",
        });
    }
}

// Comprueba el token y si es correcto devuelve la información
const token = async(req, res = response) => {
    const token = req.headers["x-token"];
    try {
        const uToken = await jwt.verify(token, process.env.JWTSECRET);

        pool.query(
            "SELECT * FROM usuario WHERE id = " + uToken.id,
            async function(err, results) {
                if (err) throw err;
                if (response.length === 0) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Token no válido",
                        token: "",
                    });
                } else {
                    return res.json({
                        ok: true,
                        msg: "Token",
                        id: results[0].id,
                        rol: results[0].rol,
                        nombre: results[0].nombre,
                        email: results[0].email,
                        token: await generarJWT(results[0].id, results[0].rol, results[0].email),
                    });
                }
            }
        );
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Token no válido",
            token: "",
        });
    }
};

module.exports = { login, token };