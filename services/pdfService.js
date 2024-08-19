const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateReservationPDF(reservation, user) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = `Reservation_${reservation._id}.pdf`;
        const filePath = path.join(__dirname, '../pdfs', fileName);
        
        // Ensure the `pdfs` directory exists
        if (!fs.existsSync(path.join(__dirname, '../pdfs'))) {
            fs.mkdirSync(path.join(__dirname, '../pdfs'));
        }

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(25).text('Reservation Confirmation', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(16).text(`Reservation ID: ${reservation._id}`);
        doc.text(`Hotel: ${reservation.hotel.name}`);
        doc.text(`Room Type: ${reservation.roomType}`);
        doc.text(`Guests: ${reservation.guests}`);
        doc.text(`Check-In: ${new Date(reservation.checkIn).toDateString()}`);
        doc.text(`Check-Out: ${new Date(reservation.checkOut).toDateString()}`);
        doc.text(`Status: ${reservation.status}`);
        
        doc.moveDown();
        doc.text(`Thank you, ${user.name}, for booking with us!`, { align: 'center' });

        doc.end();

        doc.on('finish', () => {
            resolve({ fileName, filePath });
        });

        doc.on('error', reject);
    });
}

module.exports = { generateReservationPDF };
