const db = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, required: true },
    resetPin: { type: String, default: null },
    resetPinExpiration: { type: Date, default: null }
})

// to crypt the password 

userSchema.pre('save', async function (next) {
    try {
        var user = this;

        // Only hash the password if it's modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }

        try {
            const salt = await (bcrypt.genSalt(10));

            const hashpass = await bcrypt.hash(user.password, salt);

            user.password = hashpass;
        } catch (e) {
            return next(error);
        }
    } catch (e) {

    }
})

const userModel = db.model('users', userSchema)

module.exports = userModel