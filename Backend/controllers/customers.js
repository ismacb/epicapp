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
        pool.query("UPDATE usuario set ( nombre, apellidos, edad, imagen, telefono) values ('" +
            req.body.nombre + "' , '" +
            req.body.apellidos + "' , '" +
            req.body.edad + "' , null, '" +
            req.body.telefono + "' , ')",
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
        pool.query("SELECT * FROM entrenamiento, comida WHERE id_cliente =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
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

module.exports = { getAllCustomers, registerCustomer, getCustomer, editCustomer, getCoachsbyCustomer, deleteCustomer, getTrains, getTrainbyDate, getFeedbyDate, getFeeds, getTrainFeed }