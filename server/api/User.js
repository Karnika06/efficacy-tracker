const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const { Auth, localVariables } = require("../middleware/auth");
//const verifyUser = require("../middleware/auth");
const sendingMail = require("../api/sendEmail");
const crypto = require("crypto");
const VerifyUser = require("../middleware/verify")

const ENV = require("../config");
const baseURL = 'http://localhost:3001'

//jwt token
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", (req, res) => {
  let { name, email, contact, password } = req.body;

  // if( name == "" || email == "" || password == "" || contact == ""){
  //     res.json({

  //         status: "FAILED",
  //         message: "Empty input fields"
  //     })
  // } else if()

  db.query(
    "SELECT email FROM efficacytracker.employee WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        //console.log(error);
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      }
      if (result.length === 0) {
        //new user logic

        //password handling
        bcrypt.hash(password, ENV.SALT_ROUNDS, (err, hash) => {
          if (err) {
            //console.log(err);
            res.json({
              status: "FAILED",
              message: "An error occurred while hashing password!",
            });
          }
          db.query(
            "INSERT INTO efficacytracker.employee (name,email,contactNumber,password) VALUES (?,?,?,?)",
            [name, email, contact, hash],
            (err, resp) => {
              if (err) {
                //console.log(err);
                res.json({
                  status: "FAILED",
                  message: "An error occurred while registering user",
                });
              }

              //res.send("Data inserted");
              res.json({
                status: "SUCCESS",
                message: "Signup successful",
                data: resp,
              });
            }
          );
        });
      } else {
        //existing user, redirect to another page
        res.json({
          status: "FAILED",
          message: "User with the provided email already exists.",
        });
      }
    }
  );
});

// Sending verification mail
router.post("/sendVerificationMail", async (req, res) => {
  let { name, email, contact, password } = req.body;
  var status, msg;

  req.body.subject = "Email Verification";
  const randomToken = crypto.randomBytes(32).toString("hex");
  req.body.text =
    'Please <a href="http://'+ENV.SERVER_ADDRESS+':3001/mail-verification?token=' +
    randomToken +
    '"> verify</a> your mail by clicking on verify.';

  
  //  if(result[0].is_verified == 0 ){
  const sent = await sendingMail(req, res);

  if (sent.data.status != "STATUS") {
 

    db.query(
      "UPDATE efficacytracker.employee SET verification_token = ?, verified_at = NOW() WHERE email = ?",
      [randomToken, email],
      (error, result, field) => {
        if (error) {
          status = "FAILED";
          msg = "An error occurred while verification email";
          //console.log(error)
          return res.json({ status, msg }); // Return early to prevent multiple responses
        }
        

        status = "SUCCESS";
        msg = "The verification link has been sent to your email address. Verify your email and then log in.";
        res.json({ status, msg }); // Send the response once
      }
    );
  } else {
    status = "FAILED";
    msg = "Something goes wrong. Please try again";
    res.json({ status, msg }); // Send the response once
  }

});

// Login
router.post("/login", VerifyUser, (req, res) => {
  let { email, password } = req.body;

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
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              const id = result[0].id;
              const token = jwt.sign({ id, email }, ENV.JWT_SECRET, {
                expiresIn: 3600 * 24 * 7,
              });
              req.session.user = result;
              
              //res.json({auth: true, token: token, result: result});
              res.json({
                status: "SUCCESS",
                message: "Login successful",
                token: token,
                data: result,
              });
            } else {
              res.json({
                status: "FAILED",
                message: "Invalid password!",
              });
            }
          });
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

// Get all users
router.get("/getallusers", (req, res) => {
  db.query(
    "SELECT * FROM efficacytracker.employee",

    (err, resp) => {
      if (err) {
        //console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while getting all tasks",
        });
      } else {
        //res.send("Data inserted")
        res.json({
          status: "SUCCESS",
          message: "Got all data",
          data: resp,
        });
      }
    }
  );
});

// get specific user
router.get("/getuserbyid/:id", (req, res) => {
  db.query(
    "SELECT * FROM efficacytracker.employee WHERE id = ?",
    [req.params.id],

    (err, resp) => {
      if (err) {
        //console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while getting all tasks",
        });
      } else {
        //res.send("Data inserted")

        res.json({
          status: "SUCCESS",
          message: "Got user data",
          data: resp,
        });
      }
    }
  );
});

// Delete single or multiple user
router.post("/deleteuser", (req, res) => {
  let employee_id = req.body.id;

  let status;

  for (let i = 0; i < employee_id.length; i++) {
    db.query(
      "DELETE FROM efficacytracker.employee WHERE id = ? ",
      [employee_id[i]],

      (err, resp) => {
        if (err) {
          //console.log(err);
          status = "FAILED";
          res.json({
            status: "FAILED",
            message: "An error occurred while deleting user",
          });
        } else {
          //res.send("Data inserted")
          if (status !== "FAILED" && i + 1 == employee_id.length) {
            res.json({
              status: "SUCCESS",
              message: "Deleted data",
            });
          } else {
            status = "NOT SUCCESS";
          }
        }
      }
    );
  }
});

//Adding other user details
router.put("/addotheruserdetails", Auth, (req, res) => {
  // console.log(req.body);
  // console.log(req.user);

  db.query(
    "UPDATE efficacytracker.employee SET ? WHERE id = ?",
    [req.body, req.user.id],
    (err, resp) => {
      if (err) {
        
        res.json({
          status: "FAILED",
          message: "An error occurred while adding user data",
        });
      } else {
        // res.send("Data inserted")
        
        res.json({
          status: "SUCCESS",
          message: "Profile updated",
          data: resp,
          auth_id: req.user.id
        });
      }
    }
  );
});

// create reset session
router.get("/createresetsession", (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // allow access to this route only once
    return res.status(201).send({ msg: "Access granted!" });
  }

  return res.status(440).send({ error: "Session expired!" });
});

// Reset password
router.put("/resetpassword", (req, res) => {
  if (!req.app.locals.resetSession)
    return res.status(440).send({ error: "Session expired!" });

  const { email, newPassword } = req.body;

  // check if user with given email exists
  db.query(
    "SELECT * FROM efficacytracker.employee WHERE email = ?",
    [email],
    (error, results, fields) => {
      if (error) 
      res.json({
        status: "FAILED",
        message: error,
      });

      if (results.length === 0) {
        res.json({
          status: "FAILED",
          message: "User with email " + email + " does not exist.",
        });
        return;
      }

      // hash new password
      bcrypt.hash(newPassword, ENV.SALT_ROUNDS, function (error, hash) {
        if (error)
          res.json({
            status: "FAILED",
            error: error,
            message: "Error occurred while resetting password. Try Again!",
          });

        // update password for user
        db.query(
          "UPDATE efficacytracker.employee SET password = ? WHERE email = ?",
          [hash, email],
          (error, results, fields) => {
            if (error)
              res.json({
                status: "FAILED",
                error: error,
                message: "Error occurred while resetting password. Try Again!",
              });
            res.json({
              status: "SUCCESS",
              message: "Password for user " + email + " has been reset.",
            });
          }
        );
      });
    }
  );
  // try {
  //   const { email, password} = req.body;

  //   try {

  //   } catch (error) {
  //     return res.status(500).send({ error})
  //   }

  // } catch(error) {
  //   return res.status(401).send({error})
  // }
});

module.exports = router;
