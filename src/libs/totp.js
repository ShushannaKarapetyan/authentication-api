const {Unauthorized} = require('../errors');

function validate(totp, token) {
    try {
        return totp.validate({token});
    } catch (error) {
        throw new Unauthorized('2FA: User is not authorized.');
    }
}

module.exports = {
    validate,
}
