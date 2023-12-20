const db = require('../config/db');
const mongoose = require('mongoose');

const emailVerificationSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    pin: {type: String, default: null},
    expiration: {type: Date, default: null}
})

const emailVerificationModel = db.model('email_verifications', emailVerificationSchema);

module.exports = emailVerificationModel;