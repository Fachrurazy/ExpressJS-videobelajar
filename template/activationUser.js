function generateActivationEmail (activationLink, fullname) {
    return `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #FCF8CA;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }
        .activation-button {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
        }
        .footer {
            text-align: center;
            color: #888888;
            font-size: 12px;
            margin-top: 20px;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Account Activation
        </div>
        <div class="content">
            <p>Dear User ${fullname}</p>
            <p>Thank you for registering on our platform. Please click the button below to activate your account:</p>
            <a href="${activationLink}" class="activation-button">Activate My Account</a>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="${activationLink}">${activationLink}</a></p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Vidio Belajar. All rights reserved.
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = generateActivationEmail;
