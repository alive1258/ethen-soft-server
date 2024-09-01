import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "../users/user.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

//will call controller function

// create user route
router.post(
  "/create-user",
  validateRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser
);

// get users route
router.get("/", UserControllers.getAllUsers);
router.get("/:userId", UserControllers.getSingleUser);

// update users info route
router.patch("/:userId", UserControllers.updateUser);

// delete user route
router.delete("/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
