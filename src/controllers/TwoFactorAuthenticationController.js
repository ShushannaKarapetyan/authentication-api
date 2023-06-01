const TokenLib = require("../libs/token");
const {CommonUtil, ResponseHandler} = require("../utils");
const OTPAuth = require("../utils/otp-auth");
const {UserModel} = require("../models");
const TOTPLib = require("../libs/totp");
const {Unauthorized} = require("../errors");

class TwoFactorAuthenticationController {
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

    async verifyOTP(req, res, next) {
        try {
            const authorization = req.headers['authorization'];
            const {code} = req.body;
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

module.exports = new TwoFactorAuthenticationController();
