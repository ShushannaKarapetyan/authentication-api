const CustomError = require('./custom-error');
const HttpStatus = require('http-status-codes');

class BadRequest extends CustomError {
    constructor(message) {
        super({
            message: message,
            status: HttpStatus.BAD_REQUEST,
        });
    }
}

module.exports = BadRequest;
