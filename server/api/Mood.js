const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { check, validationResult } = require('express-validator');

router.post(
    '/addMood-data',
    [
      check('employee_id').isInt(),
      check('employee_mood').isString(),
      check('mood_reasons').isArray(),
      check('message').isString(),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
  
      const { employee_id, employee_mood, mood_reasons, message } = req.body;
  
      // Check if the employee has already submitted mood data today
      db.query(
        'SELECT COUNT(*) AS count FROM `efficacytracker`.`mood` WHERE employee_id = ? AND DATE(mood_date) = CURDATE()',
        [employee_id],
        (error, results) => {
          if (error) {
            //console.error(error);
            return res.status(500).json({status: "FAILED", message: 'Internal server error'});
          }
  
          const count = results[0].count;
          if (count > 0) {
            return res.json({status: "FAILED", message: 'Employee has already submitted mood data today'});
          }
  
          // Insert the mood data into the database
          db.query(
            'INSERT INTO `efficacytracker`.`mood` (employee_id, employee_mood, mood_reasons, message) VALUES (?, ?, ?, ?)',
            [employee_id, employee_mood, JSON.stringify(mood_reasons), message],
            (error, results) => {
              if (error) {
                //console.error(error);
                return res.json({status: "FAILED", message: 'Internal server error'});
              }
  
              return res.json({status: "SUCCESS", message: 'Mood data submitted successfully'});
            }
          );
        }
      );
    }
  );

  module.exports = router;
