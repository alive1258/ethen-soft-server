import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

// user login route
router.post(
  "/login",
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser
);
// refresh token route
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
