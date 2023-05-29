const {UserModel} = require('../models');
const JWT = require('jsonwebtoken');
const {ResponseHandler} = require('../utils');
const {Unauthorized} = require('../errors');

class ProfileController {
    async profile(req, res, next) {
        const {authorization} = req.headers;

        try {
            const {id} = await JWT.verify(authorization, process.env.JWT_SECRET);
            const user = await UserModel.findById(id).select('username email');

            return ResponseHandler.handleSuccess(res, user);
        } catch (error) {
            if (error.constructor.name === 'JsonWebTokenError') {
                //throw new Unauthorized('JsonWebTokenError: invalid token.');
            }

            return next(error);
        }
    }
}

module.exports = new ProfileController();
