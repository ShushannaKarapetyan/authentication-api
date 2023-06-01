const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {validateRequest} = require('../middlewares/validators/validator');
const {
    registerUserSchema,
    loginUserSchema,
    // generateOTPSchema,
    verifyOTPSchema,
} = require('../middlewares/validators/schemas');

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
// router.post(
//     '/otp/generate',
//     validateRequest(generateOTPSchema),
//     AuthController.generateOTP
// );
router.post(
    '/otp/verify',
    validateRequest(verifyOTPSchema),
    AuthController.verifyOTP
);

// user should be logged in
router.post(
    '/otp/enable',
    AuthController.enableOTP
);

router.post(
    '/otp/disable',
    AuthController.disableOTP
);

module.exports = router;
