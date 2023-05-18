const jwt = require("jsonwebtoken");
const db = require("../config/db");
const ENV = require("../config");

/* authorization middleware */
const Auth = async (req, res, next) => {
  try {
    //access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrive the user details from logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    //console.log(decodedToken);
    req.user = decodedToken;

    //res.json(decodedToken)
    // console.log(decodedToken)
    next();
  } catch (error) {
    //console.log(error);
    res.json({ status: "FAILED", message: "Authentication Failed" });
  }
};

const localVariables = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

module.exports = { Auth, localVariables };
