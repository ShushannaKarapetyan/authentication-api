const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {UserModel} = require('../models');
const {ResponseHandler} = require('../utils');
const {NotFoundError, ConflictError} = require('../errors');
const {JWT_SECRET, PASSWORD_SALT} = process.env;

class AuthController {
    async register(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const user = await UserModel.findOne({email: email});

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
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});

            if (!user) {
                throw new NotFoundError('User not found.');
            }

            const matches = await bcrypt.compare(password, user.password);

            if (!matches) {
                throw new NotFoundError('User not found.');
            }

            const token = JWT.sign({id: user.id, email},
                JWT_SECRET,
                {expiresIn: 60 * 60}
            );

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
