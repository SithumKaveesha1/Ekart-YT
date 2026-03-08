import nodeMailer from "nodemailer";
import 'dotenv/config';

export const sendOTPMail = (otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
}



const mailConfigurations = {
    // It should be a string of sender/server email
    from: process.env.MAIL_USER,
    to: email,

    // Subject of Email
    subject: 'Password Reset OTP',

    // This would be the text of email body
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`
};
    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('OTP Sent Successfully');
        console.log(info);
    });



