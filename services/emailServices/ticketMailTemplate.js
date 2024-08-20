function ticketMailTemplate(name, flight) {
    const template = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Ticket Confirmation</title>
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
            <h1>ApnaSafar</h1>
        </div>
        
        <div class="content">
            <h2>Your Flight Ticket Confirmation</h2>
            <p>Dear ${name},</p>
            <p>Your flight ticket has been successfully booked. Please find the details below:</p>
            <ul>
                <li>Flight: ${flight.flightNumber}</li>
                <li>Date: ${flight.departureTime}</li>
                <li>Departure: from ${flight.from}</li>
                <li>Arrival: at ${flight.to}</li>
            </ul>
            <p>For any queries, please contact our customer support.</p>
        </div>

        <div class="footer">
            <p>&copy; 2024 ApnaSafar. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
    return template;
}

module.exports = { ticketMailTemplate }