const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const {
    getAllCoaches,
    registerCoach,
    getCoach,
    getCustomersbyCoach,
    editCoach,
    deleteCustomer,
    getTrains,
    getFeeds,
    getTrainFeed,
    newCustomer,
    trainsCusto,
    feedsCusto,
    newEjercicio,
    misEjercicios,
    entreno,
    newEntreno,
    newAlimento,
    misAlimentos,
    comida,
    newComida
} = require("../controllers/coaches");

const router = Router();

router.get("/", validarJWT, getAllCoaches);
router.post("/register", registerCoach);
router.get("/coach", validarJWT, getCoach);
router.get("/customers", validarJWT, getCustomersbyCoach);
router.put("/edit", validarJWT, editCoach);
router.delete("/customer/delete", validarJWT, deleteCustomer);
router.put("/customer/new", validarJWT, newCustomer);
router.put("/customer/trains", validarJWT, trainsCusto);
router.put("/customer/feeds", validarJWT, feedsCusto);
router.get("/trainigs", validarJWT, getTrains);
router.get("/feedings", validarJWT, getFeeds);
router.get("/trainfeed", validarJWT, getTrainFeed);
router.post("/newExercise", validarJWT, newEjercicio);
router.get("/misEjercicios", validarJWT, misEjercicios);
router.post("/newEntreno", validarJWT, newEntreno);
router.get("/entreno", validarJWT, entreno);
router.post("/newAlimento", validarJWT, newAlimento);
router.get("/misAlimento", validarJWT, misAlimentos);
router.get("/comida", validarJWT, comida);
router.post("/newComida", validarJWT, newComida);

module.exports = router;