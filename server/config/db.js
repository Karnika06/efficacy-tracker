const mysql = require('mysql2')      //creating mysql object, this variable will allow us to create another variable db
const ENV = require("../config");

console.log("Start")

const db = mysql.createConnection({
   
    user: ENV.USER_DB,
    host: ENV.HOST_DB,
    password: ENV.PASSWORD_DB,
    database: ENV.DATABASE_DB,
    
} )

module.exports = db;
