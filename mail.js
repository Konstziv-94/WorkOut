const nodemailer = require('nodemailer');
const mailGun =  require('nodemailer-mailgun-transport');
const mailgun = require("mailgun-js")


const auth = {
    auth:{
        api_key:'f8554f5a0071c948a292516772b4786b-e31dc3cc-74330364',
        domain:'sandbox8e6059a0908244858eb1c6b768ce2652.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));




const  sendMail = (email , subject , text, cb ) => {
    const mailOptions = {
        from: email,
        to:'kostastziv@gmail.com',
        subject:subject,
        text:text
    };




    transporter.sendMail(mailOptions,function(err,data) {
        if (err){
            cb(err,null)
        }else{
            cb(null,data)
        }
    });
}


module.exports = sendMail;