const authService = require('../service/auth_services')

class AuthController {

    async confirmMail(req, res) {
        const { email } = req.body;

        const result = await authService.confirmMail(email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async verifyConfirmMailPin(req, res) {
        const { email, pin } = req.body;

        const result = await authService.verifyConfirmMailPin(email, pin);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
    
    async signup(req, res) {
        const { username, email, password } = req.body;

        // Check if field is null
        if (username == undefined) {
            res.status(400).json({ status: false, message: "please fill username" })
            return;
        } else if (email == undefined) {
            res.status(400).json({ status: false, message: "please fill email" })
            return;
        } else if (password == undefined) {
            res.status(400).json({ status: false, message: "please fill password" })
            return;
        }


        const result = await authService.signup(username, email, password);

        if (result.status) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const result = await authService.login(email, password);

            if (result.status) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    async forgetPassword(req, res) {
        const { email } = req.body;

        const result = await authService.forgetPassword(email);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    async verifyResetPin(req, res) {
        const { email, pin } = req.body;
        const result = await authService.verifyResetPin(email, pin);

        if (result.status) {
            res.status(200).json(result)
        } else {
            res.status(400).json(result)
        }
    }

    async resetPassword(req, res) {
        const { email, password } = req.body;

        const result = await authService.resetPassword(email, password);

        if (result.status) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
}

module.exports = new AuthController();