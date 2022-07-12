const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.post('/', [
    validarJWT,
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;