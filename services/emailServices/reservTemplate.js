function reservMailTemplate(user, reserv, price) {
    const template = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Reservation Confirmation</title>
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
        .details {
            margin-top: 20px;
        }
        .details-item {
            margin-bottom: 10px;
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
            <h1>Your Hotel Reservation Confirmation</h1>
        </div>
        
        <div class="content">
            <p>Dear ${user.name},</p>
            <p>We are pleased to confirm your reservation at our hotel.</p>
            
            <div class="details">
                <h2>Reservation Details:</h2>
                <ul>
                    <li class="details-item"><strong>Name:</strong> ${user.name}</li>
                    <li class="details-item"><strong>Check-in:</strong> ${new Date(reserv.checkIn).toLocaleString()}</li>
                    <li class="details-item"><strong>Check-out:</strong> ${new Date(reserv.checkIn).toLocaleString()}</li>
                    <li class="details-item"><strong>Room Type:</strong> ${reserv.roomType}</li>
                    <li class="details-item"><strong>Total Cost:</strong> ${price}</li>
                </ul>
            </div>
            
            <p>If you have any questions or need further assistance, please contact us at reservations@yourhotel.com.</p>
            <p>Thank you for choosing our hotel!</p>
        </div>

        <div class="footer">
            <p>&copy; 2024 Your Hotel Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    return template;
}

module.exports = { reservMailTemplate }