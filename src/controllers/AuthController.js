const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {UserModel} = require('../models');
const {ResponseHandler, CommonUtil} = require('../utils');
const {NotFoundError, ConflictError, Unauthorized} = require('../errors');
const OTPAuth = require('../utils/otp-auth');
const TokenLib = require('../libs/token');
const TOTPLib = require('../libs/totp');
const {JWT_SECRET, PASSWORD_SALT} = process.env;

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

            // check if otp is enabled
            if (user.otp_base32) {
                return ResponseHandler.handleSuccess(res, {
                    message: 'Please generate otp and verify it.',
                    token
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

    async enableOTP(req, res, next) {
        try {
            const authorization = req.headers['authorization'];
            const {email} = await TokenLib.verify(authorization);

            const base32_secret = CommonUtil.generateRandomBase32();

            const totp = new OTPAuth(base32_secret);
            let otp_auth_url = totp.toString();

            await UserModel.updateOne({email}, {
                otp_base32: base32_secret,
                otp_enabled: true,
                otp_auth_url,
            });

            return ResponseHandler.handleSuccess(res, {
                base32: base32_secret,
                otp_auth_url,
                message: 'Please verify OTP.'
            });
        } catch (error) {
            return next(error);
        }
    }

    // async generateOTP(req, res, next) {
    //     const {email} = req.body;
    //
    //     try {
    //         const user = await UserModel.findOne({email});
    //
    //         if (!user) {
    //             throw new NotFoundError('User not found.');
    //         }
    //
    //         const base32_secret = CommonUtil.generateRandomBase32();
    //
    //         const totp = new OTPAuth(base32_secret);
    //         let otp_auth_url = totp.toString();
    //
    //         await UserModel.updateOne({email}, {
    //             otp_base32: base32_secret,
    //             otp_auth_url,
    //         });
    //
    //         return ResponseHandler.handleSuccess(res, {
    //             base32: base32_secret,
    //             otp_auth_url,
    //         });
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    async verifyOTP(req, res, next) {
        try {
            const {code} = req.body;
            const authorization = req.headers['authorization'];
            const {email} = await TokenLib.verify(authorization);
            const user = await UserModel.findOne({email});

            const totp = new OTPAuth(user.otp_base32);
            let delta = TOTPLib.validate(totp, code);

            if (delta === null) {
                throw new Unauthorized('2FA: User is not authorized.');
            }

            return ResponseHandler.handleSuccess(res, {
                message: 'OTP verified.'
            });
        } catch (error) {
            return next(error);
        }
    }

    async disableOTP(req, res, next) {
        try {
            const authorization = req.headers['authorization'];
            const {email} = await TokenLib.verify(authorization);

            await UserModel.updateOne({email}, {
                otp_base32: null,
                otp_enabled: false,
                otp_auth_url: null,
            });

            return ResponseHandler.handleSuccess(res, {
                otp_enabled: false,
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
