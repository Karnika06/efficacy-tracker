const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//jwt token
const jwt = require("jsonwebtoken");

// Adding task
router.post("/addfeedback", (req, res) => {

    
  let { feedback_data, employee_id } = req.body;
  db.query(
    "INSERT INTO efficacytracker.feedback (feedback, employee_id) VALUES (?, ?)",
    [
      feedback_data, employee_id
    ],
    (err, resp) => {
      if (err) {
        //console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while adding task",
        });
      } else {
        //res.send("Data inserted")
        res.json({
          status: "SUCCESS",
          message: "Task added",
          data: resp,
        });
      }
    }
  );
});

router.get("/getfeedback", (req, res) => {

db.query(
  "SELECT * FROM efficacytracker.feedback",
  
  (err, resp) => {
    if (err) {
      //console.log(err);
      res.json({
        status: "FAILED",
        message: "An error occurred while getting all feedbacks",
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

router.post("/deletefeedback", (req, res) => {

  let feedback_id = req.body.id

  let status

  for(let i = 0 ; i < feedback_id.length ; i++){

    db.query(
      "DELETE FROM efficacytracker.feedback WHERE feedback_id = ? ",[feedback_id[i]],
      
      (err, resp) => {

        if (err) {
         
          res.json({
            status: "FAILED",
            message: "An error occurred while deleting feedback",
          });

        } else {
          //res.send("Data inserted")
          if(status !== 'FAILED' && (i+1) == feedback_id.length) {
      
              res.json({
                status: "SUCCESS",
                message: "Deleted data",
                
              });

              
            
          } else {
            
            res.json({
              status: "FAILED",
              message: "Deleted data",
              
            });
          }
        }
      }
    );
    }
  });

module.exports = router;
