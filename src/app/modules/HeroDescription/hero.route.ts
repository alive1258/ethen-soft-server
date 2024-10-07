import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { HeroControllers } from "./hero.controller";
import { HeroValidation } from "./hero.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new hero
router.post(
  "/create-hero",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(HeroValidation.createHeroValidationSchema),
  HeroControllers.createHero
);

// Route to get all heroes
router.get("/", HeroControllers.getAllHeroes);

// Route to get a single hero by ID
router.get("/:heroId", HeroControllers.getSingleHero);

// Route to update a hero by ID
router.patch(
  "/:heroId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  HeroControllers.updateHero
);

// Route to delete a hero by ID
router.delete(
  "/:heroId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  HeroControllers.deleteHero
);

export const HeroRoutes = router;
