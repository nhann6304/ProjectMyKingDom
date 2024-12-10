export const templateSenOtp = ({ user_last_name, otpCode, }: { user_last_name: string, otpCode: string }) => {
    return `
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

        .header-image {
            height: 80px;
            width: 200px;
            object-fit: contain;
        }

        .welcome {
            margin: 0;
            margin: 10px 0;
            font-size: 14px;
        }

        .code-otp {
            text-align: center;
            font-size: 50px;
            margin: 10px;
            color: #cf102d;
        }

        .box-info {
            margin: 10px 0;
        }

        .info {
            padding: 5px 0;
            margin-left: 50px;
            font-size: 14px;

        }

        .content {
            margin-top: 0;
            font-size: 14px;
            line-height: 1.5;

        }

        .footer {
            text-align: center;
            font-size: 14px;
        }

        .link-web {
            color: orange;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <img class="header-image" src="https://estellaplace.com.vn/Data/Sites/1/Product/131/logo-254x76.png" alt="">
        </div>
        <div class="content">
            <p class="welcome">Mến chào anh/chị ${user_last_name}</p>
            <p class="welcome">Chúng tôi nhận được yêu cầu thiết lập lại mật khẩu cho tài khoản của bạn.</p>
            <p class="welcome">Mã thiết lập tài khoản của bạn là.</p>
            <h1 class="code-otp">${otpCode}</h1>
            <p class="content">Nếu bạn không yêu cầu thay đổi mật khẩu ở hệ thống
                <a class="link-web" href="#">Mykingdom</a>, hãy bỏ qua thông báo này
            </p>
            <p>Xin cảm ơn!</p>
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>

</html>
    `
} 