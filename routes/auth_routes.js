const express = require('express');
const authController = require('../controller/auth_controller')

const router = express.Router();

// Confirm Mail 
router.post('/confirm-mail', authController.confirmMail)

// Verify Confirm Mail Pin
router.post('/verify-confirm-mail-pin', authController.verifyConfirmMailPin)

// Signup Router
router.post('/signup', authController.signup);

// Login Router
router.post('/login', authController.login);

// Forget Password - Send PIN to user mail id
router.post('/forget-password', authController.forgetPassword)

// Verify Reset PIN
router.post('/verify-reset-pin', authController.verifyResetPin);

// Reset Password
router.post('/reset-password', authController.resetPassword);


module.exports = router