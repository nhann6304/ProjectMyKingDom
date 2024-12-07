import * as nodemailer from "nodemailer"

export const emailConfig = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: +process.env.PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER_SEND,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    return transporter
}


