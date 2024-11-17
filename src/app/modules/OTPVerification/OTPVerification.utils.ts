import nodemailer from "nodemailer";
import config from "../../config";

// Configuring transporter with the provided environment variables
export const transporter = nodemailer.createTransport({
  host: config.mail_host,
  port: config.mail_port,
  secure: config.mail_secure,
  auth: {
    user: config.auth_email,
    pass: config.auth_password,
  },
});
