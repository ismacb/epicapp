let pool = require('../database/configdb.js');

//Devuelve todos los ejercicios
const getAllExercises = async(req, res) => {
    try {
        pool.query("SELECT * FROM ejercicio",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllExercises",
            token: "",
        });
    }
};

//Registrar ejercicio
const registerExercise = async(req, res) => {
    try {
        pool.query("INSERT INTO ejercicio (url, descripcion, series, reps, rir, peso, nombre) values" +
            "('" + req.body.url + "', '" + req.body.descripcion + "', " + req.body.series + ", " + req.body.reps + ", " + req.body.peso + ", '" + req.body.nombre + "')",
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
            msg: "Error en registerExercise",
            token: "",
        });
    }
}

//Devolver datos del ejercicio
const getExercise = async(req, res) => {
    try {
        pool.query("SELECT * FROM ejercicio WHERE id =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getExercise",
            token: "",
        });
    }
};

//Editar alimento
const editExercise = async(req, res) => {
    try {
        pool.query("UPDATE ejercicio set (url, descripcion, series, reps, rir, peso, nombre) values" +
            "('" + req.body.url + "', '" + req.body.descripcion + "', " + req.body.series + ", " + req.body.reps + ", " + req.body.peso + ", '" + req.body.nombre + "')",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editExercise",
            token: "",
        });
    }
};

//Elimina un entrenamiento
const deleteExercise = async(req, res) => {
    try {
        pool.query("DELETE FROM ejercicio WHERE id =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deleteExercise",
            token: "",
        });
    }
};

module.exports = { getAllExercises, registerExercise, getExercise, editExercise, deleteExercise }