const HttpStatus = require('http-status-codes');

class ResponseHandler {
    static handleSuccess(res, data) {
        return res.status(HttpStatus.OK).json({success: true, data});
    }
}

module.exports = ResponseHandler;
