const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//jwt token
const jwt = require("jsonwebtoken");

// Adding task
router.post("/addtask", (req, res) => {

    
  let {
    employee_id,
    task_name,
    status,
    duration,
    priority,
    level,
    dueDate,
    startDate,
    task_desc
  } = req.body;
  db.query('SELECT COUNT(*) AS task_count FROM `efficacytracker`.`tasks` WHERE DATE(created_at) = CURDATE()',(err,response) => {
    if(err) {
      
      res.json({
        status: "FAILED",
        message: "An error occurred while adding task",
      });
    } else {
      task_count = response[0].task_count
      console.log(task_count)
      if(task_count < 10) {
        db.query(
          "INSERT INTO efficacytracker.tasks (task_name,employee_id,task_status, task_duration, task_priority, task_level, dueDate, startDate, task_desc) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            task_name,
            employee_id,
            status,
            duration,
            priority,
            level,
            dueDate,
            startDate,
            task_desc
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
      } else {
        res.json({
          status: "FAILED",
          message: "Today's task limit 10 reached. You can't add more task for today.",
        });
      }
    }
  })
  
});

router.get("/gettask/:id", (req, res) => {

db.query(
  "SELECT * FROM efficacytracker.tasks WHERE employee_id = ?",[req.params.id],
  
  (err, resp) => {
    if (err) {
      //console.log(err);
      res.json({
        status: "FAILED",
        message: "An error occurred while getting all tasks",
      });
    } else {
      //res.send("Data inserted")
      console.log(resp)
      res.json({
        status: "SUCCESS",
        message: "Got all data",
        data: resp,
      });
    }
  }
);
});

router.delete("/deletetask/:id", (req, res) => {

  let task_id = req.params.id

  db.query(
    "DELETE FROM efficacytracker.tasks WHERE task_id=? ",[task_id],
    
    (err, resp) => {
      if (err) {
        //console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while deleting task",
        });
      } else {
        //res.send("Data inserted")
        res.json({
          status: "SUCCESS",
          message: "Deleted one data",
          data: resp,
        });
      }
    }
  );
  });

  router.patch("/updatetask/:task_id", (req, res) => {

    // let task_id = req.params.id

    // console.log(req.body)
    // console.log(req.params)
  
    db.query(
      "UPDATE efficacytracker.tasks SET ? WHERE ?",[req.body, req.params],
      
      (err, resp) => {
        if (err) {
          //console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occurred while updating task",
          });
        } else {
          //res.send("Data inserted")
          res.json({
            status: "SUCCESS",
            message: "Updated data",
            data: resp,
          });
        }
      }
    );
    });

module.exports = router;
