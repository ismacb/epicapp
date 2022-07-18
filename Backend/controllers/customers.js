let pool = require('../database/configdb.js');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


//Devuelve todos los entrenadores
const getAllCustomers = async(req, res) => {
    try {
        pool.query("SELECT * FROM usuario WHERE rol = 'CLIENTE' ORDER BY nombre",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllCustomers",
            token: "",
        });
    }
};

//Registrar cliente
const registerCustomer = async(req, res) => {
    const salt = bcrypt.genSaltSync();
    const cpass = bcrypt.hashSync(req.body.password, salt);
    try {
        pool.query("INSERT INTO usuario (rol, email, password, nick, nombre, apellidos, edad, telefono) values" +
            "('CLIENTE', '" +
            req.body.email +
            "' , '" + cpass + "' , '" +
            req.body.nick + "' , '" +
            req.body.nombre + "' , '" +
            req.body.apellidos + "' , " +
            req.body.edad + " , " +
            req.body.telefono + " , ')",
            async function(err, response) {
                if (err) throw err;
                if (response) {
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        host: 'smtp.gmail.com',
                        auth: {
                            user: "epicscasesoramiento@gmail.com",
                            pass: "ccoyauaynqpsotqn",
                        },
                    });
                    const mailOptions = {
                        from: "epicscasesoramiento@gmail.com",
                        to: req.body.email,
                        subject: "BIENVENID@ A EPIC",
                        html: "<h1> ¡Cuenta creada con éxito, " +
                            req.body.nombre +
                            "! </h1> <p> Desde EPIC asesoramiento os damos una calurosa bienvenida y os deseamos la mejor experiencia con nuestra herramienta. </p>" +

                            "<p>Para iniciar sesión pulsa en el siguiente enlace:</p>" +
                            '<a href="http://localhost:4200/login" style="padding: 10px; background-color: #76448A, color: white">Iniciar sesión</a>',
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                            return res.status(400).json({
                                ok: false,
                                msg: "Error enviando mail",
                                token: "",
                            });
                        } else {
                            return res.status(200).json({ info });
                        }
                    });
                }
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en registerCustomer",
            token: "",
        });
    }
}

//Devolver datos del cliente
const getCustomer = async(req, res) => {
    try {
        pool.query("SELECT * FROM usuario WHERE id =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getCustomer",
            token: "",
        });
    }
};

//Devolver entrenador mediante un cliente
const getCoachsbyCustomer = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenadorcliente ent, usuario usu WHERE usu.id = ent.id_cliente and ent.id_cliente =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getCoachsbyCustomer",
            token: "",
        });
    }
};

//Editar perfil del cliente
const editCustomer = async(req, res) => {
    try {
        pool.query("UPDATE usuario set nombre ='" + req.body.nombre + "', apellidos='" + req.body.apellidos + "', edad =" + req.body.edad + ", imagen ='', telefono=" + req.body.telefono + ", titulacion ='" + req.body.titulacion + "' WHERE id = " + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editCustomer",
            token: "",
        });
    }
};

//Elimina un usuario cliente
const deleteCustomer = async(req, res) => {
    try {
        pool.query("DELETE FROM usuario WHERE id =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deleteCustomer",
            token: "",
        });
    }
};

//Devuelve todos los entrenos del cliente
const getTrains = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento WHERE id_cliente =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getTrains",
            token: "",
        });
    }
};

//Devuelve el entreno por fecha del cliente
const getTrainbyDate = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento WHERE id_cliente =" + req.body.id + "and fecha = " + req.body.fecha + "ORDER BY fecha",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getTrainsbyDate",
            token: "",
        });
    }
};

//Devuelve todos las comiidas del cliente
const getFeeds = async(req, res) => {
    try {
        pool.query("SELECT * FROM comida WHERE id_cliente =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getFeeds",
            token: "",
        });
    }
};

//Devuelve la comida por fecha del cliente
const getFeedbyDate = async(req, res) => {
    try {
        pool.query("SELECT * FROM comida WHERE id_cliente =" + req.body.id + "and fecha = " + req.body.fecha + "ORDER BY fecha",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getFeedbyDate",
            token: "",
        });
    }
};

//Devuelve todos los entrenamientos y comidas del entrenador
const getTrainFeed = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento WHERE id_cliente =" + req.query.id + " and fecha = '" + req.query.fecha + "'",
            async function(error, results) {
                if (error)
                    throw error;
                pool.query("SELECT * FROM comida WHERE id_cliente =" + req.query.id + " and fecha = '" + req.query.fecha + "'",
                    async function(error, results2) {
                        if (error)
                            throw error;
                        results = { comida: results2, entrenamiento: results }
                        res.status(200).json(results);
                    });
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getTrainFeed",
            token: "",
        });
    }
};

const getMetricas = async(req, res) => {
    try {
        pool.query("SELECT * FROM medidascliente WHERE id_cli =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getMetricas",
            token: "",
        });
    }
};

const putMetricas = async(req, res) => {
    try {
        pool.query("INSERT INTO medidascliente (id_cli, altura, peso, imc, pbrazo, pcintura, pmuslo) VALUES (" + req.query.id + "," + req.body.altura + "," + req.body.peso + "," + req.body.imc + "," + req.body.brazo + "," + req.body.cintura + "," + req.body.muslo + ")",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getMetricas",
            token: "",
        });
    }
};

const getContactos = async(req, res) => {
    try {
        pool.query("SELECT DISTINCT(usu.nick), id_receptor FROM chat ch, usuario usu WHERE (id_emisor =" + req.query.id + " or id_receptor=" + req.query.id + ") and ch.id_receptor = usu.id and usu.id <>" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getContactos",
            token: "",
        });
    }
}

const getMensajes = async(req, res) => {
    try {
        pool.query("SELECT * FROM chat WHERE (id_emisor =" + req.query.ide + " and id_receptor =" + req.query.idr + ") or (id_emisor =" + req.query.idr + " and id_receptor =" + req.query.ide + ")",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getMensajes",
            token: "",
        });
    }
}

const putMensajes = async(req, res) => {
    try {
        pool.query("INSERT INTO chat (id_emisor, id_receptor, mensaje) values (" + req.query.idr + ", " + req.query.ide + ",'" + req.query.mensaje + "')",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en putMensajes",
            token: "",
        });
    }
}

// const getId = async(req, res) => {
//     try {
//         pool.query("SELECT id FROM usuario WHERE nick =" + req.query.nick,
//             async function(error, results) {
//                 if (error)
//                     throw error;
//                 res.status(200).json(results);
//             });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             ok: false,
//             msg: "Error en getMetricas",
//             token: "",
//         });
//     }
// }

const putMensajeNuevo = async(req, res) => {

    try {
        pool.query("SELECT id FROM usuario us WHERE us.nick ='" + req.query.nick + "'",
            async function(error, results) {
                if (error) {
                    res.status(400).json(error);
                    //throw error;
                } else {
                    if (results.length == 0) {
                        res.status(200).json(results);
                    } else if (results[0].id == req.query.id) {
                        res.status(200).json('mismo');
                    } else {
                        pool.query("INSERT INTO chat (id_emisor, id_receptor, mensaje) values (" + req.query.id + ", " + results[0].id + ",'" + req.query.mensaje + "')",
                            async function(error2, results2) {
                                if (error2)
                                    throw error2;
                                res.status(200).json(results2);
                            });
                    }
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en putMensajeNuevo",
            token: "",
        });
    }
}

const putTrainEnd = async(req, res) => {
    try {
        pool.query("UPDATE entrenamiento set obscliente ='" + req.query.mensaje + "', hecho= true, rir =" + req.query.rir + " WHERE id = " + req.query.ide,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en putTrainEnd",
            token: "",
        });
    }
};

module.exports = { getAllCustomers, registerCustomer, getCustomer, editCustomer, getCoachsbyCustomer, deleteCustomer, getTrains, getTrainbyDate, getFeedbyDate, getFeeds, getTrainFeed, getMetricas, putMetricas, getContactos, getMensajes, putMensajes, putMensajeNuevo, putTrainEnd }