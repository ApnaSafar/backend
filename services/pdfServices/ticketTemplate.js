function ticketTemplate(name, flight, seatNo) {
  const template = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .ticket {
            background-color: white;
            width: 800px;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3a3a3a;
        }
        .flight-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .passenger-info {
            margin-bottom: 20px;
        }
        .barcode {
            text-align: center;
            font-family: 'Libre Barcode 39', cursive;
            font-size: 48px;
        }
        .label {
            font-size: 12px;
            color: #777;
        }
        .value {
            font-size: 16px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header">
            <div class="logo">ApnaSafar</div>
        </div>
        <div class="flight-info">
            <div>
                <div class="label">From</div>
                <div class="value">${flight.from}</div>
            </div>
            <div>
                <div class="label">To</div>
                <div class="value">${flight.to}</div>
            </div>
            <div>
                <div class="label">Date</div>
                <div class="value">${new Date(flight.departureTime).toLocaleString()}</div>
            </div>
            <div>
                <div class="label">Time</div>
                <div class="value">14:30</div>
            </div>
            <div>
                <div class="label">Flight</div>
                <div class="value">${flight.flightNumber}</div>
            </div>
            <div>
                <div class="label">Gate</div>
                <div class="value">B22</div>
            </div>
        </div>
        <div class="passenger-info">
            <div class="label">Passenger</div>
            <div class="value">${name}</div>
        </div>
        <div class="passenger-info">
            <div class="label">Seat</div>
            <div class="value">${seatNo}</div>
        </div>
        <div class="Line">
            *Happy Fying*
        </div>
    </div>
</body>
</html>`

  return template;

}

module.exports = { ticketTemplate }