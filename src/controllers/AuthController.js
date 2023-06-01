const bcrypt = require('bcrypt');
const {UserModel} = require('../models');
const {ResponseHandler} = require('../utils');
const {NotFoundError, ConflictError, Unauthorized} = require('../errors');
const TokenLib = require('../libs/token');

class AuthController {
    async register(req, res, next) {
        const {username, email, password} = req.body;

        try {
            const user = await UserModel.findOne({email});

            if (user) {
                throw new ConflictError('This user already exists.');
            }

            const passwordHash = await bcrypt.hash(password, parseInt(PASSWORD_SALT));

            await UserModel.create({
                username,
                email,
                password: passwordHash,
            });

            return ResponseHandler.handleSuccess(res, {
                message: 'User registered successfully.',
            })
        } catch (error) {
            return next(error);
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;

        try {
            const user = await UserModel.findOne({email});

            if (!user) {
                throw new NotFoundError('User not found.');
            }

            const matches = await bcrypt.compare(password, user.password);

            if (!matches) {
                throw new NotFoundError('User not found.');
            }

            const token = await TokenLib.createToken({id: user.id, email});

            if (user.otp_enabled) {
                return ResponseHandler.handleSuccess(res, {
                    message: 'Please verify OTP.',
                    token,
                });
            }

            return ResponseHandler.handleSuccess(res, {
                message: 'You are successfully logged in.',
                token,
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
