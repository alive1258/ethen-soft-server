import express from "express";
import { AboutHeroValidation } from "./aboutHero.validation";
import { AboutHeroControllers } from "./aboutHero.controller";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new AboutHero
router.post(
  "/create-about-hero",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(AboutHeroValidation.createAboutHeroValidationSchema),
  AboutHeroControllers.createAboutHero
);

// Route to get all AboutHero
router.get("/", AboutHeroControllers.getAllAboutHero);

// Route to get a single AboutHero by ID
router.get("/:aboutHeroId", AboutHeroControllers.getSingleAboutHero);

// Route to update a AboutHero by ID
router.patch(
  "/:aboutHeroId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AboutHeroControllers.updateAboutHero
);

// Route to delete a AboutHero by ID
router.delete(
  "/:aboutHeroId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  AboutHeroControllers.deleteAboutHero
);

export const AboutHeroRoutes = router;
