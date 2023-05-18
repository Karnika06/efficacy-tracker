const express = require('express');
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser")
const session = require("express-session")
const cors = require("cors");

const ENV = require("./config");

// mysql
require('./config/db')

const port = ENV.SERVER_PORT

app.use(cors())

const UserRouter = require('./api/User')
const TaskRouter = require('./api/Tasks')
const FeedbackRouter = require('./api/Feedback')
const OtpRouter = require('./api/Otp')
const MoodRouter = require('./api/Mood')
const webRouter = require('./api/webRoute')
// const MailerRouter = require('./api/mailer')

//For accepting post form data
const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


//config
//dotenv.config({ path: "server/.env" });

// session - cookie
app.use(cookieParser())
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookies:{
        expires: 60 * 60 * 24
    }
}))

app.use('/user', UserRouter)
app.use('/task', TaskRouter)
app.use('/feedback', FeedbackRouter)
app.use('/otp', OtpRouter)
app.use('/mood', MoodRouter)
app.use('/', webRouter)

app.listen(ENV.SERVER_PORT, () => {
    console.log(`Server is running on port ${port}`);
})