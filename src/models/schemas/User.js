const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
}, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}});

module.exports = UserSchema;
