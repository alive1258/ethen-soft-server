import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { CareerOpportunityValidation } from "./careerOpportunity.validation";
import { CareerOpportunityControllers } from "./careerOpportunity.controller";

const router = express.Router();

// Route to create a new CareerOpportunity
router.post(
  "/create-career-opportunity",
  validateRequest(
    CareerOpportunityValidation.createCareerOpportunityValidationSchema
  ),
  CareerOpportunityControllers.createCareerOpportunity
);

// Route to get all CareerOpportunity
router.get("/", CareerOpportunityControllers.getAllCareerOpportunity);

// Route to get a single CareerOpportunity by ID
router.get(
  "/:careerOpportunityId",
  CareerOpportunityControllers.getSingleCareerOpportunity
);

// Route to update a CareerOpportunity by ID
router.patch(
  "/:careerOpportunityId",
  CareerOpportunityControllers.updateCareerOpportunity
);

// Route to delete a CareerOpportunity by ID
router.delete(
  "/:careerOpportunityId",
  CareerOpportunityControllers.deleteCareerOpportunity
);

export const CareerOpportunityRoutes = router;
