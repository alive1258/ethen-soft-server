import bcrypt from "bcrypt";
import config from "../../config";
import { OTPVerification } from "./OTPVerification.model";
import { TOTPVerification } from "./OTPVerification.interface";
import { transporter } from "./OTPVerification.utils";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Customer } from "../customers/customer.module";
import { User } from "../users/user.module";
import mongoose, { Types } from "mongoose";

// OTP send on the email service
const sendOTPVerificationEmail = async (_id: Types.ObjectId, email: string) => {
  try {
    // random otp generate
    const otp = `${Math.floor(1000 + Math.random() * 900000)}`;

    // make a mail structure
    const mailOptions = {
      from: "",
      to: email,
      subject: "Verify Your Email.",
      html: `<h2>He, This message from <b> Ethen Soft</b>.</h2> 
        <p> Please enter <b> ${otp} </b> in the app to verify your email address and complete the registration.<p>
        <p> Have a nice journey with <b> Ethen Soft</b> </p>
        <p> This code <b> expires in 1 hour</b>. </p>`,
    };

    // hashing otp
    const hashedOTP = await bcrypt.hash(otp, Number(config.bcrypt_salt_rounds));

    // create well structured data for create OTP verification
    const data: TOTPVerification = {
      userId: _id,
      otp: hashedOTP,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + Number(config.email_expired_time)),
    };

    // create a OTP verification data on database
    const newOTPVerification = await OTPVerification.create(data);

    // send mail with the help of nodemailer transporter
    await transporter.sendMail(mailOptions);

    return newOTPVerification;
  } catch (error: any) {
    return error.message;
  }
};

// verify OTP service
const verifyOTP = async (userId: any, otp: string, role: string) => {
  // check user recently create an account
  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Empty otp details are not allowed."
    );
  }
  // find the OTP verification data from database
  const UserOTPVerificationRecords = await OTPVerification.find({ userId });

  // throw an error if OTP verification didn't get
  if (UserOTPVerificationRecords.length <= 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Account record doesn't exist or has been verified already. Please sign up or login."
    );
  }

  // destructured OTP verification data
  const { expiresAt, otp: hashedOTP } = UserOTPVerificationRecords[0];

  // check the validation time
  if (expiresAt.getTime() < Date.now()) {
    OTPVerification.deleteMany({ userId });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Code has expired. Please request again."
    );
  }

  // OTP validation check
  const validOTP = await bcrypt.compare(otp, hashedOTP);
  if (!validOTP) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid code passed. Check your inbox."
    );
  }

  // delete the OTP verification data if validation is complete
  if (role === "customer") {
    // update customer
    await Customer.updateOne({ _id: userId }, { isEmailVerified: true });
    // delete the otp verification data from database
    await OTPVerification.deleteMany({ userId });

    // get the customer from database for response
    const user = await Customer.findById({ _id: userId }, { password: 0 });
    return user;
  } else {
    // update user
    await User.updateOne({ _id: userId }, { isEmailVerified: true });
    // delete the otp verification data from database
    await OTPVerification.deleteMany({ userId });

    // get the user from database for response
    const user = await User.findById({ _id: userId }, { password: 0 });
    return user;
  }
};

const resendOTPVerification = async (userId: Types.ObjectId, email: string) => {
  // check user recently create an account
  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Empty otp details are not allowed."
    );
  }
  // delete the OTP verification data from database
  await OTPVerification.deleteMany({ userId });

  // call send OTP verification to create an OTP again
  const result = await sendOTPVerificationEmail(userId, email);

  return result;
};

export const OTPVerificationService = {
  sendOTPVerificationEmail,
  verifyOTP,
  resendOTPVerification,
};
