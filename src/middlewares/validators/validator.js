const {BadRequest} = require("../../errors");

function validateRequest(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);

        if (error) {
            throw new BadRequest(`Bad request. ${error.message}`);
        }

        return next();
    }
}

module.exports = {
    validateRequest,
}