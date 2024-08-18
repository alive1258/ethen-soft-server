import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { TechnologyValidation } from "./technology.validation";
import { TechnologyControllers } from "./technology.controller";

const router = express.Router();

// Route to create a new technology
router.post(
  "/create-technology",
  validateRequest(TechnologyValidation.createTechnologyValidationSchema),
  TechnologyControllers.createTechnology
);

// Route to get all technologies
router.get("/", TechnologyControllers.getAllTechnology);

// Route to get a single technology by ID
router.get("/:technologyId", TechnologyControllers.getSingleTechnology);

// Route to update a technology by ID
router.patch(
  "/:technologyId",
  validateRequest(TechnologyValidation.updateTechnologyValidationSchema),
  TechnologyControllers.updateTechnology
);

// Route to delete a technology by ID
router.delete("/:technologyId", TechnologyControllers.deleteTechnology);

export const TechnologyRoutes = router;
