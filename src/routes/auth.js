const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {validateRequest} = require('../middlewares/validators/validator');
const {registerUserSchema, loginUserSchema} = require('../middlewares/validators/schemas');

router.post(
    '/register',
    validateRequest(registerUserSchema),
    AuthController.register
);
router.post(
    '/login',
    validateRequest(loginUserSchema),
    AuthController.login
);

module.exports = router;
