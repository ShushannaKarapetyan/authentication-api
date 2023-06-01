const express = require('express');
const router = express.Router();
const TwoFactorAuthenticationController = require('../controllers/TwoFactorAuthenticationController');
const {validateRequest} = require('../middlewares/validators/validator');
const {verifyOTPSchema} = require('../middlewares/validators/schemas');

router.post('/enable', TwoFactorAuthenticationController.enableOTP);
router.post(
    '/verify',
    validateRequest(verifyOTPSchema),
    TwoFactorAuthenticationController.verifyOTP
);
router.post('/disable', TwoFactorAuthenticationController.disableOTP);

module.exports = router;
