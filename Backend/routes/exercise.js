const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllExercises, registerExercise, getExercise, editExercise, deleteExercise } = require("../controllers/exercise");

const router = Router();

router.get("/", validarJWT, getAllExercises);
router.post("/register", validarJWT, registerExercise);
router.get("/exercise", validarJWT, getExercise);
router.put("/edit", validarJWT, editExercise);
router.delete("/delete", validarJWT, deleteExercise);

module.exports = router;