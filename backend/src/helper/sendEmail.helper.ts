import { BadRequestException } from "@nestjs/common";
import { emailConfig } from "src/config/email.config";
import * as nodemailer from "nodemailer"


export class SendEmailHelper {
    static async sendEmail({ user_email, subject, templateEmail }: { user_email: string, subject: string, templateEmail: string }) {
        const transport = emailConfig();
        const options: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER_SEND,
            to: user_email,
            subject: subject,
            html: templateEmail
        };
        try {
            await transport.sendMail(options);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}