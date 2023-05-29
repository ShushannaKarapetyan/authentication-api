const {Unauthorized} = require('../errors');
const JWT = require("jsonwebtoken");

class AuthMiddleware {
    static authorize(req, res, next) {
        try {
            const {authorization} = req.headers;

            if (!authorization) {
                throw new Unauthorized('User is not authorized.');
            }

            // JWT.verify(authorization, process.env.JWT_SECRET);

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = AuthMiddleware;