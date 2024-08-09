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
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #003366;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #f4f4f4;
            padding: 20px;
            margin-top: 20px;
        }
        .footer {
            background-color: #003366;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>ApnaSafar</h1>
    </div>
    
    <div class="content">
        <h2>Your Flight Ticket Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Your flight ticket has been successfully booked. Please find the details below:</p>
        <ul>
            <li>Flight:${flight.flightNumber}</li>
            <li>Date: ${flight.departureTime}</li>
            <li>Departure: from ${flight.from}</li>
            <li>Arrival: at ${flight.to}</li>
        </ul>
        <p>Your e-ticket is attached to this email. Please present this at check-in.</p>
        <p>For any queries, please contact our customer support.</p>
    </div>

    <div class="footer">
        <p>&copy; 2024 ApnaSafar. All rights reserved.</p>
    </div>
</body>
</html>`
return template;
}

module.exports={ticketMailTemplate}