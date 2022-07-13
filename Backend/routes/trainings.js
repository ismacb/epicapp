const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllTrainings, registerTrain, getTrain, getCoach, editTrain, deleteTrain } = require("../controllers/trainings");

const router = Router();

router.get("/", validarJWT, getAllTrainings);
router.post("/register", validarJWT, registerTrain);
router.get("/train", validarJWT, getTrain);
router.get("/coach", validarJWT, getCoach);
router.put("/edit", validarJWT, editTrain);
router.delete("/delete", validarJWT, deleteTrain);

module.exports = router;