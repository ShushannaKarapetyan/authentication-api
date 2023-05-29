const JWT = require('jsonwebtoken');
const {Unauthorized} = require('../errors');

async function verify(authorization) {
    try {
        return await JWT.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
        throw new Unauthorized('User is not authorized.');
    }
}

module.exports = {
    verify,
}
