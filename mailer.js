const { mailerpass } = require("./env.js")

module.exports = function(email, datetime, instructor) {



    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'apptonice@gmail.com',
            pass: mailerpass
        }
    });

    const mailOptions = {
        from: 'apptonice@gmail.com',
        to: email,
        subject: 'Appointment on ICE',
        text: `Your appointment on ${datetime} with ${instructor} has been set`
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}