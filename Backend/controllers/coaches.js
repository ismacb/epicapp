let pool = require('../database/configdb.js');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


//Devuelve todos los entrenadores
const getAllCoaches = async(req, res) => {
    try {
        pool.query("SELECT * FROM usuario WHERE rol = 'ENTRENADOR' ORDER BY nombre",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllCoaches",
            token: "",
        });
    }
};

//Registrar entrenador
const registerCoach = async(req, res) => {
    const salt = bcrypt.genSaltSync();
    const cpass = bcrypt.hashSync(req.body.password, salt);
    try {
        pool.query("INSERT INTO usuario (rol, email, password, nick, nombre, apellidos, edad, telefono, titulacion) values" +
            "('ENTRENADOR', '" +
            req.body.email +
            "' , '" + cpass + "' , '" +
            req.body.nick + "' , '" +
            req.body.nombre + "' , '" +
            req.body.apellidos + "' , " +
            req.body.edad + " , " +
            req.body.telefono + " , '" +
            req.body.titulacion + "')",
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
            msg: "Error en registerCoach",
            token: "",
        });
    }
}

//Devolver datos del entrenador
const getCoach = async(req, res) => {
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
            msg: "Error en getCoachs",
            token: "",
        });
    }
};

//Devolver clientes de un entrenador
const getCustomersbyCoach = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenadorcliente ent, usuario usu WHERE usu.id = ent.id_cliente and ent.id_entrenador =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getCustomersbyCoach",
            token: "",
        });
    }
};

//Editar perfil de entrenador
const editCoach = async(req, res) => {
    try {
        pool.query("UPDATE usuario set ( nombre, apellidos, edad, imagen, telefono, titulacion) values ('" +
            req.body.nombre + "' , '" +
            req.body.apellidos + "' , '" +
            req.body.edad + "' , null, '" +
            req.body.telefono + "' , '" +
            req.body.titulacion + "')",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editCoach",
            token: "",
        });
    }
};

//Elimina un usuario entrenador
const deleteCoach = async(req, res) => {
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
            msg: "Error en deleteCoach",
            token: "",
        });
    }
};

//Devuelve todos los entrenamientos del entrenador
const getTrains = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento WHERE id_entrenador =" + req.body.id,
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

//Devuelve todos las comidas del entrenador
const getFeeds = async(req, res) => {
    try {
        pool.query("SELECT * FROM comida WHERE id_entrenador =" + req.body.id,
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

//Devuelve todos los entrenamientos y comidas del entrenador
const getTrainFeed = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento, comida WHERE id_entrenador =" + req.body.id,
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

module.exports = {
    getAllCoaches,
    registerCoach,
    getCoach,
    getCustomersbyCoach,
    editCoach,
    deleteCoach,
    getTrains,
    getFeeds,
    getTrainFeed
}