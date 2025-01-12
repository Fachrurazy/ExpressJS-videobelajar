const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });

        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
}
