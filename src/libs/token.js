const JWT = require('jsonwebtoken');
const {Unauthorized} = require('../errors');
const {JWT_SECRET} = process.env;

async function createToken(userInfo) {
    return JWT.sign(userInfo,
        JWT_SECRET,
        {expiresIn: 60 * 60},
    );
}

async function verify(authorization) {
    try {
        return await JWT.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
        throw new Unauthorized('User is not authorized.');
    }
}

module.exports = {
    verify,
    createToken,
}
