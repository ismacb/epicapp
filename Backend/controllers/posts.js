let pool = require('../database/configdb.js');

//Devuelve todos los posts
const getAllPosts = async(req, res) => {
    try {
        pool.query("SELECT post.id as idp, post.*, usuario.nick  FROM post, usuario WHERE usuario.id = id_usuario ORDER BY id desc",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getAllPosts",
            token: "",
        });
    }
};

//Registrar post
const registerPost = async(req, res) => {
    try {
        pool.query("INSERT INTO post (id_usuario, imagen, titulo, descripcion, likes, ubicacion) values" +
            "(" + req.query.id + ",'" + req.body.imagen + "', '" + req.body.titulo + "','" + req.body.descripcion + "', 0, '" + req.body.ubi + "')",
            async function(err, response) {
                if (err) throw err;
                if (response) {
                    res.status(200).json(response);
                }
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en registerPost",
            token: "",
        });
    }
}

//Devolver datos del post
const getPost = async(req, res) => {
    try {
        pool.query("SELECT * FROM post WHERE id =" + req.query.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en getPost",
            token: "",
        });
    }
};

//Editar post
const editPost = async(req, res) => {
    try {
        pool.query("UPDATE alimento set (descripcion, comentarios, likes, ubicacion) values" +
            "('" + req.body.descripcion + "', '" + req.body.comentarios + "', " + req.body.likes + ", '" + req.body.ubicacion + "')",
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en editPost",
            token: "",
        });
    }
};

//Elimina un post
const deletePost = async(req, res) => {
    try {
        pool.query("DELETE FROM post WHERE id =" + req.body.id,
            async function(error, results) {
                if (error)
                    throw error;
                res.status(200).json(results);
            });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: "Error en deletePost",
            token: "",
        });
    }
};

module.exports = { getAllPosts, registerPost, getPost, editPost, deletePost }