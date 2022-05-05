const CONFIG =require('../configuration/config')
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: CONFIG.host,
            service: CONFIG.service,
            port: 587,
            secure: true,
            auth: {
                user: CONFIG.user,
                pass: CONFIG.pass,
            },
        });

        await transporter.sendMail({
            from: CONFIG.user,
            to: CONFIG.email,
            subject: subject,
            text: text,
        });

        console.log("Verfication link Sended Successfullu");
    } catch (error) {
        console.error(error, "email not sent")
        
    }
};

module.exports = sendEmail;