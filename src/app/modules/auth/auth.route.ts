import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// user login route
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser
);
// refresh token route
router.post("/refresh-token", AuthController.refreshToken);

// forget password
router.post("/forget-password", AuthController.forgetPassword);

//reset password
router.post(
  "/reset-password",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.CUSTOMER),
  AuthController.resetPassword
);

export const AuthRoutes = router;
