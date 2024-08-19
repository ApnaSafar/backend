function reservTemplate(name, reserv, price) {
    const template = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Reservation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .details {
            margin: 20px 0;
        }
        .details p {
            margin: 10px 0;
            font-size: 18px;
            color: #555;
        }
        .details span {
            font-weight: bold;
            color: #333;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hotel Reservation</h1>
        <div class="details">
            <p><span>Guest Name:</span> ${name}</p>
            <p><span>Hotel Name:</span> ${reserv.hotelName}</p>
            <p><span>Room Type:</span> ${reserv.roomType}</p>
            <p><span>Price:</span>${price}</p>
            <p><span>Number of Guests:</span>${reserv.guests}</p>
            <p><span>Check-In Date:</span>${new Date(reserv.checkIn).toLocaleString()}</p>
            <p><span>Check-Out Date:</span>${new Date(reserv.checkOut).toLocaleString()}</p>
        </div>
        <div class="footer">
            <p>Thank you for choosing our service! We wish you a pleasant stay.</p>
        </div>
    </div>
</body>
</html>
`

    return template;

}

module.exports = { reservTemplate }