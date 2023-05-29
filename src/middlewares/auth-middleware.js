const {Unauthorized} = require('../errors');
const TokenLib = require('../libs/token');

class AuthMiddleware {
    static async authorize(req, res, next) {
        try {
            const {authorization} = req.headers;

            if (!authorization) {
                throw new Unauthorized('User is not authorized.');
            }

            req.userData = await TokenLib.verify(authorization);

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = AuthMiddleware;
