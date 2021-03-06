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
        pool.query("INSERT INTO usuario (rol, email, password, nick, nombre, apellidos, edad, telefono, titulacion) values('" + req.body.rol + "', '" +
            req.body.email + "' , '" +
            cpass + "' , '" +
            req.body.nick + "' , '" +
            req.body.nombre + "' , '" +
            req.body.apellidos + "' , " +
            req.body.edad + " , " +
            req.body.telefono + " , '" +
            req.body.titulacion + "')",
            async function(err, response) {
                if (err) {
                    res.status(400).json(err);
                    throw err;
                }
                if (response) {
                    res.status(200).json(response);

                    // const transporter = nodemailer.createTransport({
                    //     service: "gmail",
                    //     host: 'smtp.gmail.com',
                    //     auth: {
                    //         user: "epicscasesoramiento@gmail.com",
                    //         pass: "ccoyauaynqpsotqn",
                    //     },
                    // });
                    // const mailOptions = {
                    //     from: "epicscasesoramiento@gmail.com",
                    //     to: req.body.email,
                    //     subject: "BIENVENID@ A EPIC",
                    //     html: "<h1> ??Cuenta creada con ??xito, " +
                    //         req.body.nombre +
                    //         "! </h1> <p> Desde EPIC asesoramiento os damos una calurosa bienvenida y os deseamos la mejor experiencia con nuestra herramienta. </p>" +

                    //         "<p>Para iniciar sesi??n pulsa en el siguiente enlace:</p>" +
                    //         '<a href="http://localhost:4200/login" style="padding: 10px; background-color: #76448A, color: white">Iniciar sesi??n</a>',
                    // };

                    // transporter.sendMail(mailOptions, function(error, info) {
                    //     if (error) {
                    //         console.log(error);
                    //         return res.status(400).json({
                    //             ok: false,
                    //             msg: "Error enviando mail",
                    //             token: "",
                    //         });
                    //     } else {
                    //         return res.status(200).json({ info });
                    //     }
                    // });
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

const deleteCustomer = async(req, res) => {
    try {
        pool.query("DELETE FROM entrenadorcliente WHERE id_entrenador =" + req.query.ide + " and id_cliente=" + req.query.idc,
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

const newCustomer = async(req, res) => {
    try {
        pool.query("SELECT id FROM usuario WHERE nick = '" + req.query.nick + "'",
            async function(error, results) {

                pool.query("INSERT INTO entrenadorcliente (id_entrenador, id_cliente) VALUES(" + req.query.ide + ", " + results[0].id + ")",
                    async function(error, results) {
                        if (error)
                            throw error;
                        res.status(200).json(results);
                    });
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en newCustomer",
            token: "",
        });
    }
};

const trainsCusto = async(req, res) => {
    try {
        pool.query("SELECT id, nombre, hecho FROM entrenamiento WHERE id_entrenador = '" + req.query.ide + "' and id_cliente ='" + req.query.idc + "'",
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en trainsCusto",
            token: "",
        });
    }
};

const feedsCusto = async(req, res) => {
    try {
        pool.query("SELECT id, tipo, hecho FROM comida WHERE id_entrenador = " + req.query.ide + " and id_cliente =" + req.query.idc,
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en feedsCusto",
            token: "",
        });
    }
};

const newAlimento = async(req, res) => {
    try {
        pool.query("INSERT INTO alimento (nombre, cantidad,hc,proteina, grasa,kcal) values('" + req.body.nombre + "', " +
            req.body.cantidad + " , " +
            req.body.hc + " , " +
            req.body.proteina + " , " +
            req.body.grasa + " , " +
            req.body.kcal,
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en newAlimento",
            token: "",
        });
    }
};

const newComida = async(req, res) => {
    try {
        pool.query("INSERT INTO comida (id_entrenador, id_cliente, tipo, fecha, kcal) values(" + req.body.id_entrenador + ", " +
            req.body.id_cliente + " , '" +
            req.body.tipo + "' , '" +
            req.body.fecha + "' , " +
            req.body.kcal,
            async function(error, results) {
                var ids = req.body.numeros.split("/");
                for (let i = 0; i < ids.length; i++) {
                    pool.query("INSERT INTO comidaalimento (id_comida, id_alimento) values(" + results[0].id + ", " + ids[i] + ")",
                        async function(error, results) {});
                }
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en newEjercicio",
            token: "",
        });
    }
};

const misAlimentos = async(req, res) => {
    try {
        pool.query("SELECT al.* FROM alimento al, comida co, comidaalimento coa WHERE co.id_entrenador = " + req.query.ide + " and co.id = coa.id_comida and coa.id_alimento = al.id",
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en misAlimentos",
            token: "",
        });
    }
};

const comida = async(req, res) => {
    try {
        pool.query("SELECT co.*, al.* FROM alimento al, comida co, comidaalimento coa WHERE co.id = " + req.query.id + " and co.id = coa.id_comida and coa.id_comida = al.id",
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en comida",
            token: "",
        });
    }
};

const newEjercicio = async(req, res) => {
    try {
        pool.query("INSERT INTO ejercicio (nombre, series, reps, rir, id_entrena) values ('" + req.query.nombre + "', " +
            req.query.series + " , " +
            req.query.reps + " , " +
            req.query.rir + " , " + req.query.ide + ")",
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en newEjercicio",
            token: "",
        });
    }
};

const newEntreno = async(req, res) => {
    try {
        pool.query("INSERT INTO entrenamiento (id_entrenador, id_cliente, nombre, fecha, minutos) values(" + req.body.id_entrenador + ", " +
            req.body.id_cliente + " , '" +
            req.body.nombre + "' , '" +
            req.body.fecha + "' , " +
            req.body.minutos,
            async function(error, results) {
                var ids = req.body.numeros.split("/");
                for (let i = 0; i < ids.length; i++) {
                    pool.query("INSERT INTO entrenamientoejercicio (id_entrenamiento, id_ejercicio) values(" + results[0].id + ", " + parseInt(ids[i]) + ")",
                        async function(error, results) {});
                }
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en newEjercicio",
            token: "",
        });
    }
};

const misEjercicios = async(req, res) => {
    try {
        pool.query("SELECT ej.* FROM ejercicio ej WHERE ej.id_entrena = " + req.query.ide,
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en misEjercicios",
            token: "",
        });
    }
};

const entreno = async(req, res) => {
    try {
        pool.query("SELECT en.*, ej.* FROM ejercicio ej, entrenamiento en, entrenamientoejercicio enej WHERE en.id = " + req.query.id + " and en.id = enej.id_entrenamiento and enej.id_ejercicio = ej.id",
            async function(error, results) {
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en entreno",
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
    getTrainFeed,
    deleteCustomer,
    newCustomer,
    trainsCusto,
    feedsCusto,
    newEjercicio,
    misEjercicios,
    entreno,
    newEntreno,
    newAlimento,
    misAlimentos,
    comida,
    newComida
}