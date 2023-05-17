const db = require("../config/db");

const VerifyUser = async (req, res, next) => {
    try {
   
  
      const { email } = req.method === "GET" ? req.query : req.body;
  
      // check user existence
      const exist = await db.promise().query(
        "SELECT * FROM efficacytracker.employee WHERE email = ? AND verified = 1",
        [email]
      );

      
  
      if (!exist[0].length) {
        return res.json({status: 'FAILED', error: "Can't find user or user is not verified! Verify user by clicking on the verify link sent to registered email." });
      }
  
      next();
    } catch (error) {
      //console.log(error);
      return res.json({status: 'FAILED', error: "Authentication Error" });
    }
  };
  

  module.exports = VerifyUser ;