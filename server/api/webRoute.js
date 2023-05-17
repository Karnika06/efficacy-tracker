// const express = require('express')
// const user_route = express()
// const db = require("../config/db");
// user_route.set('view engine', 'ejs');
// user_route.set('views','../views')

// const verifyEmail = (req, res) => {
    
//     var token = req.query.token;

//     db.query('SELECT * FROM efficacytracker.userverification WHERE tokens=? limit 1', [token], function(error, result, fields){
//         if(error){
//             console.log(error.message);
//         }

//         if(result.length > 0){

//             db.query(`
//             UPDATE users SET tokens = null, is_verified = 1 WHERE id = '${result[0].id}`)

//             return res.render('mail-verification', {message: 'Mail Verified Successfully!'})

//         }else{
//             return res.render('404')
//         }
//     })

// }

// user_route.get('/mail-verification', verifyEmail)

// module.exports = user_route;

const express = require('express');
const user_route = express();
const db = require("../config/db");

const path = require('path');

// Set the views directory
user_route.set('views', path.join(__dirname, '../views'));
user_route.set('view engine', 'ejs');
// user_route.set('views','../views');

const verifyEmail = (req, res) => {
    var token = req.query.token;

    db.query('SELECT * FROM efficacytracker.employee WHERE verification_token = ? LIMIT 1', [token], function(error, result, fields){
        if(error){
            res.render(error.message);
        }
//console.log(result)
        if(result.length > 0){
            db.query(`UPDATE efficacytracker.employee SET verification_token = null, verified = 1 WHERE id = '${result[0].id}'`, function (error, updateResult, fields) {
                if (error) {
                    //console.log(error.message);
                    return res.render('404');
                }
                return res.render('mail-verification', { message: 'Mail Verified Successfully!' });
            });
        }else{
            return res.render('404');
        }
    });
}

user_route.get('/mail-verification', verifyEmail);

module.exports = user_route;
