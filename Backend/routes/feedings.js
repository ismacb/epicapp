const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllFeedings, registerFeed, getFeed, getCoach, editFeed, deleteFeed, hechofeed } = require("../controllers/feedings");

const router = Router();

router.get("/", validarJWT, getAllFeedings);
router.post("/register", validarJWT, registerFeed);
router.get("/feed", validarJWT, getFeed);
router.get("/coach", validarJWT, getCoach);
router.put("/edit", validarJWT, editFeed);
router.put("/edit/end", validarJWT, hechofeed);
router.delete("/delete", validarJWT, deleteFeed);

module.exports = router;