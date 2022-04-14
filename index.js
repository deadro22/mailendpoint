const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.USR,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `<${req.body.mail}>`,
    to: process.env.USR,
    subject: req.body.subject,
    html: `<h4>From:</h4>${req.body.mail}\n<h4>Message:</h4><p style="font-weight:600">${req.body.message}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Email sent: " + info.response);
      res.end("Sent");
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening");
});
