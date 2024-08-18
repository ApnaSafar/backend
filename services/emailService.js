const nodemailer = require('nodemailer');

async function sendReservationEmail(user, reservation, pdfPath) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // your Gmail account
            pass: process.env.EMAIL_PASS, // your Gmail password or app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Reservation Confirmation',
        text: `Dear ${user.name},\n\nThank you for your reservation. Please find attached your reservation confirmation.\n\nBest regards,\nHotel Team`,
        attachments: [
            {
                filename: `Reservation_${reservation._id}.pdf`,
                path: pdfPath,
            },
        ],
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendReservationEmail };
