import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { HomeAboutValidation } from "./homeAbout.validation";
import { HomeAboutControllers } from "./homeAbout.controller";

const router = express.Router();

// Route to create a new HomeAbout
router.post(
  "/create-home-about",
  validateRequest(HomeAboutValidation.createHomeAboutValidationSchema),
  HomeAboutControllers.createHomeAbout
);

// Route to get all HomeAbout
router.get("/", HomeAboutControllers.getAllHomeAbout);

// Route to get a single HomeAbout by ID
router.get("/:homeAboutId", HomeAboutControllers.getSingleHomeAbout);

// Route to update a HomeAbout by ID
router.patch("/:homeAboutId", HomeAboutControllers.updateHomeAbout);

// Route to delete a HomeAbout by ID
router.delete("/:homeAboutId", HomeAboutControllers.deleteHomeAbout);

export const HomeAboutRoutes = router;
