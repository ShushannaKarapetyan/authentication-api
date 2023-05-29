const {UserModel} = require('../models');
const {ResponseHandler} = require('../utils');
const TokenLib = require("../libs/token");

class ProfileController {
    async profile(req, res, next) {
        const {authorization} = req.headers;

        try {
            const {id} = await TokenLib.verify(authorization);
            const user = await UserModel.findById(id).select('username email');

            return ResponseHandler.handleSuccess(res, user);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ProfileController();
