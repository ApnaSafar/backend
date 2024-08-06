const Mailjet = require('node-mailjet')
const { authMailTemplate } = require('./authMailTemplate.js');
require('dotenv').config();

if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    console.error('Mailjet API keys are not defined');
    process.exit(1); // Exit the application if critical environment variables are missing
}

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
)
console.log("connected to mailjet api");


const authEmail = (name, email) => {
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "apnasafar435@gmail.com",
                        Name: "Apna Safar",
                    },
                    To: [
                        {
                            Email: email,
                            Name: name,
                        }
                    ],
                    Subject: "Welcome to Apna Safar",
                    TextPart: `Welcome to Apna Safar! Your journey to hassle-free travel booking starts here. Log in now to explore flights, trains, and buses all in one place. Happy travels!`,
                    HTMLPart: authMailTemplate(name)
                }
            ]
        })

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = { authEmail }