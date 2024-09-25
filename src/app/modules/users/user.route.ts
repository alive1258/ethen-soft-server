import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "../users/user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

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
router.patch(
  "/:userId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN, ENUM_ROLE.CUSTOMER),
  UserControllers.updateUser
);

// delete user route
router.delete(
  "/:userId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  UserControllers.deleteUser
);

export const UserRoutes = router;
