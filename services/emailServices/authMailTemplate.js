function authMailTemplate(name) {
    const template = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Apna Safar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Apna Safar!</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We're thrilled to have you join Apna Safar, your go-to platform for hassle-free travel ticket booking. Your journey to seamless travel experiences starts now!</p>
            <p>With Apna Safar, you can:</p>
            <ul>
                <li>Book flights and hotels all in one place</li>
                <li>Find the best deals on tickets</li>
                <li>Manage your bookings easily</li>
            </ul>
            <p>To get started, simply log in to your account and start exploring our wide range of travel options.</p>
            <p style="text-align: center;">
                <a href="https://frontend-git-main-takshs-projects.vercel.app/" class="button">Log In Now</a>
            </p>
            <p>If you have any questions or need assistance, our customer support team is always here to help. Just reply to this email or contact us at support@apnasafar.com.</p>
            <p>Happy travels!</p>
            <p>Best regards,<br>The Apna Safar Team</p>
        </div>
        <div class="footer">
            <p>Follow us on social media:</p>
            <p>
                <a href="https://www.facebook.com/narendramodi/">Facebook</a> |
                <a href="https://x.com/RahulGandhi">Instagram</a>
            </p>
        </div>
    </div>
</body>
</html>
`;

    return template;
}

module.exports = { authMailTemplate }