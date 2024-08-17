import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { HeroControllers } from "./hero.controller";
import { HeroValidation } from "./hero.validation";

const router = express.Router();

// Route to create a new hero
router.post(
  "/create-hero",
  validateRequest(HeroValidation.createHeroValidationSchema),
  HeroControllers.createHero
);

// Route to get all heroes
router.get("/", HeroControllers.getAllHeroes);

// Route to get a single hero by ID
router.get("/:heroId", HeroControllers.getSingleHero);

// Route to update a hero by ID
router.patch("/:heroId", HeroControllers.updateHero);

// Route to delete a hero by ID
router.delete("/:heroId", HeroControllers.deleteHero);

export const HeroRoutes = router;
