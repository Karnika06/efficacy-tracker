const db = require("../config/db");
const VerifyUser = async (req, res, next) => {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;

    // Check if email exists
    const existByEmail = await db
      .promise()
      .query("SELECT * FROM efficacytracker.employee WHERE email = ?", [email]);

    if (!existByEmail[0].length) {
      return res.json({
        status: "FAILED",
        message: "User email doesn't exist! Please provide a valid email address.",
      });
    }

    const user = existByEmail[0][0];

    // Check if user is verified
    if (!user.verified) {
      return res.json({
        status: "FAILED",
        message:
          "User is not verified! Verify user by clicking on the verify link sent to the registered email.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.json({ status: "FAILED", error: "Authentication Error" });
  }
};

module.exports = VerifyUser;
