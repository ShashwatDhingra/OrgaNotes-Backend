const nodemailer = require('nodemailer')


class Utils {
    async sendMail(to, subject, text) {

        const EMAIL = process.env.EMAIL;
        const PASS = process.env.PASS;

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'devtest773@gmail.com',
                pass: PASS
            }
        });


        // Configure email options
        const mailOptions = {
            from: 'OrgaNotes',
            to,
            subject,
            text,
            inReplyTo: this.generateUniqueMessageId(),
            references: this.generateUniqueMessageId(),
        };

        try {
            // Send email
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(info);
                    console.log(err.message);
                } else {
                    console.log(info);
                    console.log('mail sent')
                }
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw error; // Propagate the error to the caller
        }
    };


    /**
    * Generates a random 4-digit PIN code as a string.
    * @returns {string} The generated PIN code.
    */
    pinGenerator() {

        // Generate a random 4-digit PIN
        const pinCode = Math.floor(1000 + Math.random() * 9000);

        return pinCode.toString();
    };

    generateUniqueMessageId() {
        // Create a unique identifier, for example, using a timestamp
        const timestamp = new Date().getTime();
        const uniqueId = `${timestamp}orga-notes`; // Replace 'yourdomain.com' with your actual domain
        return uniqueId;
    };


}

module.exports = new Utils();