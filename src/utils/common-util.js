const crypto = require('crypto');
const {encode} = require('hi-base32');

class CommonUtil {
    static generateRandomBase32() {
        const buffer = crypto.randomBytes(15);

        return encode(buffer).replace(/=/g, "").substring(0, 24);
    };
}

module.exports = CommonUtil;
