import nodemailer from "nodemailer";
import config from "../../config";

// created a transporter to transport mail by the help of nodemailer
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.auth_email,
    pass: config.auth_password,
  },
});
