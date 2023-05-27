const {UserModel} = require('../models');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

class AuthController {
    async register(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const user = await UserModel.findOne({email: email});

            if (user) {
                throw new Error('This user already exists.');
            }

            const passwordHash = await bcrypt.hash(password, 10);

            await UserModel.create({
                username,
                email,
                password: passwordHash,
            });

            return res.status(201).json({
                message: 'User created successfully.'
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email});

            if (!user) {
                return res.status(404).json({
                    error: 'User not found.',
                });
            }

            const matches = await bcrypt.compare(password, user.password);

            if (!matches) {
                return res.status(404).json({
                    error: 'User not found.',
                });
            }

            const token = JWT.sign({id: user.id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: 60 * 60}
            );

            return res.status(200).json({
                message: "You are successfully logged in.",
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
