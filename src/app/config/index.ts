import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRE_IN,
  },
  mail_host: process.env.MAIL_HOST,
  mail_secure: process.env.MAIL_SECURE === "true" ? true : false,
  mail_port: Number(process.env.MAIL_PORT),
  auth_email: process.env.AUTH_EMAIL,
  auth_password: process.env.AUTH_PASSWORD,
  email_expired_time: process.env.EMAIL_EXPIRED_TIME,
};
