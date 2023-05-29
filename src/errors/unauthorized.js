const CustomError = require('./custom-error');
const HttpStatus = require('http-status-codes');

class Unauthorized extends CustomError {
    constructor(message) {
        super({
            message,
            status: HttpStatus.UNAUTHORIZED,
        });
    }
}

module.exports = Unauthorized;
