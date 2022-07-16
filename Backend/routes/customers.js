const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt");
const { getAllCustomers, registerCustomer, getCustomer, editCustomer, getCoachsbyCustomer, deleteCustomer, getTrains, getTrainbyDate, getFeedbyDate, getFeeds, getTrainFeed, getMetricas, getContactos, putMetricas, getMensajes, putMensajes, getId } = require("../controllers/customers");

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
router.get("/metricas", validarJWT, getMetricas);
router.put("/datos", validarJWT, putMetricas);
router.get("/contacts", validarJWT, getContactos);
router.get("/mensajes", validarJWT, getMensajes);
router.put("/mensajes", validarJWT, putMensajes);
router.get("/nick", getId);

module.exports = router;