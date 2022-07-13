const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllCustomers, registerCustomer, getCustomer, editCustomer, getCoachsbyCustomer, deleteCustomer, getTrains, getTrainbyDate, getFeedbyDate, getFeeds, getTrainFeed } = require("../controllers/customers");

const router = Router();

router.get("/", validarJWT, getAllCustomers);
router.post("/register", validarJWT, registerCustomer);
router.get("/customer", validarJWT, getCustomer);
router.get("/coach", validarJWT, getCoachsbyCustomer);
router.put("/edit", validarJWT, editCustomer);
router.delete("/delete", validarJWT, deleteCustomer);
router.get("/trainigs", validarJWT, getTrains);
router.get("/trainigs/date", validarJWT, getTrainbyDate);
router.get("/feedings/date", validarJWT, getFeedbyDate);
router.get("/feedings", validarJWT, getFeeds);
router.get("/trainfeed", validarJWT, getTrainFeed);

module.exports = router;