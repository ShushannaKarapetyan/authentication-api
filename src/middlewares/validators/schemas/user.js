const Joi = require('joi');
const {OTP_DIGITS_LENGTH} = process.env;

module.exports = {
    registerUserSchema: Joi.object().keys({
        username: Joi.string().trim().max(100).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).required(),
    }),
    loginUserSchema: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(8).required(),
    }),
    generateOTPSchema: Joi.object().keys({
        email: Joi.string().trim().email().required(),
    }),
    verifyOTPSchema: Joi.object().keys({
        code: Joi.string().length(parseInt(OTP_DIGITS_LENGTH)).required(),
    }),
    validateOTPSchema: Joi.object().keys({
        email: Joi.string().trim().email().required(),
        token: Joi.string().length(parseInt(OTP_DIGITS_LENGTH)).required(),
    }),
    // disableOTPSchema: Joi.object().keys({
    //     email: Joi.string().trim().email().required(),
    // }),
    // enableOTPSchema: Joi.object().keys({
    //     email: Joi.string().trim().email().required(),
    // }),
};
