const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllPosts, registerPost, getPost, editPost, deletePost } = require("../controllers/posts");

const router = Router();

router.get("/", getAllPosts);
router.post("/register", validarJWT, registerPost);
router.get("/post", validarJWT, getPost);
router.put("/edit", validarJWT, editPost);
router.delete("/delete", validarJWT, deletePost);

module.exports = router;