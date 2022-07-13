let pool = require('../database/configdb.js');

//Devuelve todos los alimentos
const getAllFoods = async(req, res) => {
    try {
        pool.query("SELECT * FROM alimento",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllFoods",
            token: "",
        });
    }
};

//Registrar alimento
const registerFood = async(req, res) => {
    try {
        pool.query("INSERT INTO alimento (nombre, cantidad, hc, proteina, grasa, kcal, descripcion) values" +
            "('" + req.body.nombre + "', " + req.body.cantidad + ", " + req.body.hc + ", " + req.body.proteina + ", " + req.body.grasa + ", " + req.body.kcal + ", '" + req.body.descripcion + "')",
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
            msg: "Error en registerFood",
            token: "",
        });
    }
}

//Devolver datos del alimento
const getFood = async(req, res) => {
    try {
        pool.query("SELECT * FROM comida WHERE id =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getFood",
            token: "",
        });
    }
};

//Editar alimento
const editFood = async(req, res) => {
    try {
        pool.query("UPDATE alimento set (nombre, cantidad, hc, proteina, grasa, kcal, descripcion) values" +
            "('" + req.body.nombre + "', " + req.body.cantidad + ", " + req.body.hc + ", " + req.body.proteina + ", " + req.body.grasa + ", " + req.body.kcal + ", '" + req.body.descripcion + "')",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editFood",
            token: "",
        });
    }
};

//Elimina un entrenamiento
const deleteFood = async(req, res) => {
    try {
        pool.query("DELETE FROM alimento WHERE id =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deleteFood",
            token: "",
        });
    }
};

module.exports = { getAllFoods, registerFood, getFood, editFood, deleteFood }