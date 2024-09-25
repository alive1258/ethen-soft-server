import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { HomeAboutValidation } from "./homeAbout.validation";
import { HomeAboutControllers } from "./homeAbout.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new HomeAbout
router.post(
  "/create-home-about",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(HomeAboutValidation.createHomeAboutValidationSchema),
  HomeAboutControllers.createHomeAbout
);

// Route to get all HomeAbout
router.get("/", HomeAboutControllers.getAllHomeAbout);

// Route to get a single HomeAbout by ID
router.get("/:homeAboutId", HomeAboutControllers.getSingleHomeAbout);

// Route to update a HomeAbout by ID
router.patch(
  "/:homeAboutId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  HomeAboutControllers.updateHomeAbout
);

// Route to delete a HomeAbout by ID
router.delete(
  "/:homeAboutId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  HomeAboutControllers.deleteHomeAbout
);

export const HomeAboutRoutes = router;
