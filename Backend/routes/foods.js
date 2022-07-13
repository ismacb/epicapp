const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllFoods, registerFood, getFood, editFood, deleteFood } = require("../controllers/foods");

const router = Router();

router.get("/", validarJWT, getAllFoods);
router.post("/register", validarJWT, registerFood);
router.get("/food", validarJWT, getFood);
router.put("/edit", validarJWT, editFood);
router.delete("/delete", validarJWT, deleteFood);

module.exports = router;