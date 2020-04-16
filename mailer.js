const { mailerpass } = require("./env.js");
const db = require("./models");

const Mailer = {
  accountCreate: function(req) {
    let email = req.body.email;
    let name = `${req.body.first_name} ${req.body.last_name}`;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "apptonice@gmail.com",
        pass: mailerpass,
      },
    });

    const mailOptions = {
      from: "apptonice@gmail.com",
      to: email,
      subject: "Appointment on ICE Account Confirmation",
      text: `Hello ${name}
    Your account has been created
    User name ${email}
    
    Thank you `,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  confirmAppt: function(req) {
    let email = req.user.email;
    let name = `${req.user.first_name} ${req.user.last_name}`;
    let start = req.body.resStart;
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "apptonice@gmail.com",
        pass: mailerpass,
      },
    });

    const mailOptions = {
      from: "apptonice@gmail.com",
      to: email,
      subject: "Appointment on ICE Appointment Confirmation",
      text: `Hello ${name}
      Your ${start} appointment has been confirmed.
      
      Thank you `,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = Mailer;
