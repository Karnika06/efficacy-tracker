import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

import ENV from '../config.js'



let nodeConfig = {
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: ENV.EMAIL, // generated ethereal user
    //   pass: ENV.PASSWORD, // generated ethereal password
    // },

    host: ENV.HOST,
            service: ENV.SERVICE,
            port: Number(ENV.EMAIL_PORT),
            secure: Boolean(ENV.SECURE),
            auth: {
                user: ENV.USER,
                pass: ENV.PASS
            }
}

let transporter = nodemailer.createTransport(nodeConfig);

// let MailGenerator = new Mailgen({
//     theme: 'default',
//     product: {
//         name: 'Mailgen',
//         link: 'https://mailgen.js/'
//     }
// })

export const registerMail = async (req, res) => {
    const [username, userEmail, text, subject] = req.body;

    //body of the email
    var emailBody = {
        body: {
            name: username,
            intro: text || 'Welcome to Efficacy Tracker! We are happy to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we would love to help.'
        }
    }

    //var emailBody = MailGenerator.generate(email);

    let message = {
        from: ENV.USER,
        to: userEmail,
        subject: subject || 'Signup successful',
        html: emailBody
    }

    // SEND EMAIL
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({error}))
}

module.exports = router;