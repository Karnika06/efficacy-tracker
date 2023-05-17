
const express = require("express");

const router = express.Router();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const db = require("../config/db");

const ENV = require("../config");

let nodeConfig = {
    host: ENV.HOST,
    service: ENV.EMAIL_SERVICE,
    port: ENV.EMAIL_PORT,
    secure: ENV.SECURE,
    auth: {
      user: ENV.EMAIL,
      pass: ENV.PASS,
    },
  };

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Efficacy Tracker",
    link: "https://mailgen.js/",
  },
});

const sendingMail = async (req, res) => {

    return new Promise((resolve, reject) => {

    const { email, text, subject } = req.body;
  
    //body of the email
    var emailMessage = {
      body: {
        name: email,
        intro:
          text ||
          "Welcome to Efficacy Tracker! We are happy to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we would love to help.",
      },
    };
  
    var emailBody = MailGenerator.generate(emailMessage);
  
    let message = {
      from: ENV.EMAIL,
      to: email,
      subject: subject || "Signup successful",
      html: emailBody,
    };
  
    // SEND EMAIL
    transporter
      .sendMail(message)
      .then((res) => {
        res.data = { status: 'SUCCESS',msg: "You should receive an email from us." }
        //console.log('hey - ', res)
        resolve(res) ;
      })
      .catch((error) => {
       
        //console.log("Transporter - ", error);
        
        resolve(error);
      });
    });
  }

  module.exports = sendingMail;