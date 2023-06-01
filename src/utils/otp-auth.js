const OTPAuth = require('otpauth');
const {
    OTP_ISSUER,
    OTP_LABEL,
    OTP_DIGITS_LENGTH,
    OTP_PERIOD,
} = process.env;

class OneTimePasswordAuth extends OTPAuth.TOTP {
    constructor(otp_base32) {
        super({
            issuer: OTP_ISSUER || 'example.com',
            label: OTP_LABEL || '2f-auth',
            secret: otp_base32,
            algorithm: 'SHA1',
            digits: parseInt(OTP_DIGITS_LENGTH),
            period: parseInt(OTP_PERIOD),
        });
    }
}

module.exports = OneTimePasswordAuth;
