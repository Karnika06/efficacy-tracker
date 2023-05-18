const otpGenerator = require("otp-generator");
const express = require("express");
const {localVariables} = require("../middleware/auth");
const verifyEmail = require("../middleware/auth");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const db = require("../config/db");

const ENV = require("../config");

const sendingMail = require('./sendEmail');





router.get("/generateOTP", localVariables, (req, res) => {
  const email = req.query.email;
  db.query(
    "SELECT * FROM efficacytracker.employee WHERE email = ?",
    email,
    (err, result) => {
      if (err) {
        res.json({
          status: "FAILED",
          message: "An error occurred while logging in",
        });
      } else {
        if (result.length > 0) {
          req.app.locals.OTP = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });
          res.status(201).send({ code: req.app.locals.OTP });
        } else {
          //res.json({auth: false,message: "User doesn't exists" });
          res.json({
            status: "FAILED",
            message: "User with the provided email doesn't exists.",
          });
        }
      }
    }
  );
});

router.get("/verifyOTP", (req, res) => {
  const { otpCode } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(otpCode)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session fo reset password
    return res
      .status(201)
      .send({ status: "SUCCESS", msg: "Verified Successfully!" });
  }

  return res.status(400).send({ status: "FAILED", error: "Invalid OTP" });
});



router.post("/registerMail", sendingMail);



module.exports = router;
