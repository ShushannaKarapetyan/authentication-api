const Joi = require('joi');

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
}
