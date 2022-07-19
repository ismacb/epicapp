let pool = require('../database/configdb.js');

//Devuelve todos las comidas
const getAllFeedings = async(req, res) => {
    try {
        pool.query("SELECT * FROM comida",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllFeedings",
            token: "",
        });
    }
};

//Registrar comida
const registerFeed = async(req, res) => {
    try {
        pool.query("INSERT INTO comida (tipo, fecha, totalkcal) values" +
            "('" + req.body.tipo + "', " + req.body.fecha + ", " + req.body.totalkcal + ")",
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
            msg: "Error en registerFeed",
            token: "",
        });
    }
}

//Devolver datos de la comida
const getFeed = async(req, res) => {
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
            msg: "Error en getFeed",
            token: "",
        });
    }
};

//Devolver entrenador de la comida
const getCoach = async(req, res) => {
    try {
        pool.query("SELECT usuario.* FROM comida com, usuario usu WHERE com.id =" + req.query.id,
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

//Editar comida
const editFeed = async(req, res) => {
    try {
        pool.query("UPDATE comida (tipo, fecha, obsentrenador, obscliente, totalkcal) values" +
            "('" + req.body.tipo + "', " + req.body.fecha + ", '" + req.body.obsentrenador + "', '" + req.body.obscliente + "'," + req.body.totalkcal + ")",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editFeed",
            token: "",
        });
    }
};

const hechofeed = async(req, res) => {
    try {
        pool.query("UPDATE comida set hecho = true where id=" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en hechofeed",
            token: "",
        });
    }
};


//Elimina una comida
const deleteFeed = async(req, res) => {
    try {
        pool.query("DELETE FROM comida WHERE id =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deleteFeed",
            token: "",
        });
    }
};

module.exports = { getAllFeedings, registerFeed, getFeed, getCoach, editFeed, deleteFeed, hechofeed };