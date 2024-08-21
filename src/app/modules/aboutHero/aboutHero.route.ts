import express from "express";
import { AboutHeroValidation } from "./aboutHero.validation";
import { AboutHeroControllers } from "./aboutHero.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

// Route to create a new AboutHero
router.post(
  "/create-about-hero",
  validateRequest(AboutHeroValidation.createAboutHeroValidationSchema),
  AboutHeroControllers.createAboutHero
);

// Route to get all AboutHero
router.get("/", AboutHeroControllers.getAllAboutHero);

// Route to get a single AboutHero by ID
router.get("/:aboutHeroId", AboutHeroControllers.getSingleAboutHero);

// Route to update a AboutHero by ID
router.patch("/:aboutHeroId", AboutHeroControllers.updateAboutHero);

// Route to delete a AboutHero by ID
router.delete("/:aboutHeroId", AboutHeroControllers.deleteAboutHero);

export const AboutHeroRoutes = router;
