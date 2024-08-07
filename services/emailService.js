const nodemailer=require('nodemailer');
const { authMailTemplate } = require('./authMailTemplate.js');
require('dotenv').config();


const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})


const authEmail = async (name, email) => {

    const mail=await transporter.sendMail({
        from:`${name} <apnasafar435@gmail.com>`,
        to:`${email}`,
        subject: "Welcome to Apna Safar",
        text: `Welcome to Apna Safar! Your journey to hassle-free travel booking starts here. Log in now to explore flights, trains, and buses all in one place. Happy travels!`,
        html: authMailTemplate(name)
    })

    console.log("Mail sent",mail.messageId)
}

module.exports = { authEmail }