const { userModel } = require('../model/user_model')
const emailVerificationModel = require('../model/emailVerification_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const utils = require('../utils/utils');

class AuthService {

    //* To Confirm the user mail id - This function only sends the code to user mail id and Save the PIN corresponding to their user mailid in 'emailVerification' collection.
    async confirmMail(email) {
        try {

            let isUser = await userModel.findOne({ email });
            if (isUser) {
                return { status: false, message: "User already exists with this mail id" }
            }

            let user = await emailVerificationModel.findOne({ email });

            const generatePin = utils.pinGenerator();

            if (!user) {
                // Make new user if user does'nt exists
                user = new emailVerificationModel({
                    email,
                    pin: generatePin,
                    expiration: Date.now() + 60000  // PIN valid for 1 minute
                });
            } else {
                user.pin = generatePin;
                user.expiration = Date.now() + 60000 // PIN valid for 1 minute
            }

            const saveUserRes = await user.save();

            if (saveUserRes) {
                const result = utils.sendMail(email, 'OrgaNotes - PIN for Confirmation', `PIN - ${generatePin}`);

                if (result) {
                    return { status: true, message: "Please check your inbox" };
                } else {
                    return { status: false, message: 'Something went wrong! Please try again later.' }
                }
            } else {
                return { status: false, message: "Something went wrong! Try again later" };
            }
        } catch (e) {
            console.log(e.message)
            return { status: false, message: 'Something went wrong! Please contact the team' }
        }
    }

    async verifyConfirmMailPin(email, pin) {
        try {
            const user = await emailVerificationModel.findOne({ email });

            if (!user) {
                return { status: false, message: "User does'nt exists" }
            }

            if (pin != user.pin) {
                return { status: false, message: "PIN doesn't match" };
            }

            const expirationCheck = user.expiration - Date.now();
            if (expirationCheck < 0) {
                return { status: false, message: "PIN got expired" };
            } else {
                user.pin = null;
                user.expiration = null;
                await user.save();
                return { status: true, message: "Proceed for Signup" }
            }
        } catch (e) {
            return { status: false, message: 'Something went wrong! Please try again later.' }
        }
    }

    async signup(username, email, password) {
        try {
            // Check if the user exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return { status: false, message: 'Email already exists' };
            }

            // Create a new user instance
            const user = new userModel({ username, email, password });

            // Save the user to the database
            const result = await user.save();

            // Generate a JWT Token
            const token = utils.generateJWT(user.username, user.email);

            if (result) {
                console.log('--- accounted created ---');
                return { status: true, message: 'Signup Successful', token };
            }
            return { status: false, message: 'Something went wrong' };


        } catch (e) {
            console.error(e);
            return { status: false, message: e.message };
        }
    }

    async login(email, password) {
        try {
            // check if user exist or not
            const user = await userModel.findOne({ email });

            if (!user) {
                return { status: false, message: "user does'nt exists with this mail id." }
            }

            // decrypt the password and compare the entered password with the hashed password stored in the database
            const isPassValid = await bcrypt.compare(password, user.password);

            // if true - means password matches
            if (!isPassValid) {
                return { status: false, message: "Wrong password buddy! Cross check it" }
            }

            // Generate a JWT Token
            const token = utils.generateJWT(user.username, user.email);

            return { status: true, message: "Enjoy! Organized your notes with OrgaNotes", token };
        } catch (e) {
            console.log(e);
            return { status: false, message: e.message };
        }
    }

    // This function only sends the code to user mail id and Save the PIN corresponding to their user mailid in 'users' collection 
    async forgetPassword(email) {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return { status: false, message: "User Not Found" };
            }

            const generatePin = utils.pinGenerator();

            user.resetPin = generatePin;
            user.resetPinExpiration = Date.now() + 60000;  // PIN valid for 1 minutes
            await user.save();

            const result = utils.sendMail(email, 'OrgaNotes - Code for reset password', `PIN - ${generatePin}`)

            if (result) {
                return { status: true, message: "Please check you mail-id" };
            } else {
                return { status: false, message: 'Something went wrong! Please try again later.' }
            }

        } catch (e) {
            return { status: false, message: "Something wrong there! Please try again." }
        }
    }

    async verifyResetPin(email, pin) {

        let user = await userModel.findOne({ email });

        if (!user) {
            return { status: false, message: "User Not Found" };
        }

        user = await userModel.findOne({ email, resetPin: pin, resetPinExpiration: { $gt: Date.now() } })  // another way to verify the pin weather it expire, using $gt i.e. query operator

        if (!user) {
            return { status: false, message: "Invalid or expired PIN" };
        }

        return { status: true, message: "Please set the new password" }
    }

    async resetPassword(email, password) {
        const user = await userModel.findOne({ email });

        if (!user) {
            return { status: false, message: 'User not found' }
        }

        user.password = password;
        user.resetPin = null;
        user.resetPinExpiration = null;
        const isSaved = await user.save();

        if (isSaved) {
            return { status: true, message: "Password Changed Successfully" };
        } else {
            return { status: false, message: "Something went wrong! Try again" }
        }

    }
}

module.exports = new AuthService();