const dotenv = require("dotenv")
dotenv.config();
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "a17014024@gmail.com", // generated ethereal user
        pass: "strong_password", // generated ethereal password
    },
});
//asharali03063457443@gmail.com
//asharali_123
module.exports = transporter