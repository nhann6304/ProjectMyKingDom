import { registerAs } from '@nestjs/config';
import { TransportOptions } from 'nodemailer';

export default registerAs('mailer', () => ({
    transport: {
        host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
        port: parseInt(process.env.MAIL_PORT, 10) || 587,
        secure: process.env.MAIL_SECURE === 'true', // Ví dụ: true cho SSL, false cho TLS
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // Tùy chọn cho kết nối an toàn
        },
    },
}));
