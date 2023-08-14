import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

//** SEND EMAIL */
const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: "Developer's Corner",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });
  console.log("Message Send: ", info.messageId);
  console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));
});

export default sendEmail;
