const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllCoaches, registerCoach, getCoach, getCustomersbyCoach, editCoach, deleteCoach, getTrains, getFeeds, getTrainFeed } = require("../controllers/coaches");

const router = Router();

router.get("/", validarJWT, getAllCoaches);
router.post("/register", registerCoach);
router.get("/coach", validarJWT, getCoach);
router.get("/customers", validarJWT, getCustomersbyCoach);
router.put("/edit", validarJWT, editCoach);
router.delete("/delete", validarJWT, deleteCoach);
router.get("/trainigs", validarJWT, getTrains);
router.get("/feedings", validarJWT, getFeeds);
router.get("/trainfeed", validarJWT, getTrainFeed);


module.exports = router;