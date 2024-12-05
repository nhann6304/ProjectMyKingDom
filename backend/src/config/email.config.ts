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




export const templateSuccessEmail = (email: string) => {
    `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
            text-align: left;
        }

        .content h1 {
            color: #333333;
        }

        .content p {
            color: #555555;
            line-height: 1.6;
        }

        .content a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
        }

        .content a:hover {
            background-color: #0056b3;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h2 style="color: red;">Welcome to Our App</h2>
        </div>
        <div class="content">
            <p>We are excited to have you on board. Click the button below to get started:</p>
            <a href="${email}">Get Started</a>
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>

</html>
    `
}