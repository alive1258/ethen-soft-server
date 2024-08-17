import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

//will call controller function
router.post("/create-user", UserControllers.createUser);

router.get("/:userId", UserControllers.getSingleUser);

router.delete("/:userId", UserControllers.deleteUser);

router.patch("/:userId", UserControllers.updateUser);

router.get("/", UserControllers.getAllUsers);

export const UserRoutes = router;
