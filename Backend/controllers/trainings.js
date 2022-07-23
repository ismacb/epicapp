let pool = require('../database/configdb.js');

//Devuelve todos los entrenamientos
const getAllTrainings = async(req, res) => {
    try {
        pool.query("SELECT * FROM entrenamiento",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllTrainings",
            token: "",
        });
    }
};

//Registrar entrenamiento
const registerTrain = async(req, res) => {
    try {
        pool.query("INSERT INTO entrenamiento (fecha, minutos, obsentrenador) values" +
            "('" + req.body.fecha + "', " + req.body.minutos + ", '" + req.body.obsentrenador + "')",
            async function(err, response) {
                if (err) throw err;
                if (response) {
                    res.status(200).json(results);
                }
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en registerTrain",
            token: "",
        });
    }
}

//Devolver datos del entrenamiento
const getTrain = async(req, res) => {
    try {
        pool.query("SELECT ej.* FROM entrenamientoejercicio ee, ejercicio ej WHERE ee.id_ejercicio = ej.id and ee.id_entrenamiento =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getTrain",
            token: "",
        });
    }
};

//Devolver entrenador del entrenamiento
const getCoach = async(req, res) => {
    try {
        pool.query("SELECT usuario.* FROM entrenamiento ent, usuario usu WHERE ent.id =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getCoach",
            token: "",
        });
    }
};

//Editar entrenamiento
const editTrain = async(req, res) => {
    try {
        pool.query("UPDATE entrenamiento set (fecha, minutos, obsentrenador, obscliente) values" +
            "(" + req.body.fecha + ", " + req.body.minutos + ", '" + req.body.obsentrenador + "', '" + req.body.obsentrenador + ")",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editTrain",
            token: "",
        });
    }
};

//Elimina un entrenamiento
const deleteTrain = async(req, res) => {
    try {
        pool.query("DELETE FROM entrenamiento WHERE id =" + req.query.idt,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deleteTrain",
            token: "",
        });
    }
};

module.exports = { getAllTrainings, registerTrain, getTrain, getCoach, editTrain, deleteTrain }