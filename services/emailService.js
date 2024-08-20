const nodemailer = require('nodemailer');

async function sendReservationEmail(user, reservation) {
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
        text: `Dear ${user.name},\n\nThank you for your reservation..\n\nBest regards,\nHotel Team`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendReservationEmail };
