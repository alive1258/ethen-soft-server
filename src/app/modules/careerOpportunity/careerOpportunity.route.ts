import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { CareerOpportunityValidation } from "./careerOpportunity.validation";
import { CareerOpportunityControllers } from "./careerOpportunity.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new CareerOpportunity
router.post(
  "/create-career-opportunity",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
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
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  CareerOpportunityControllers.updateCareerOpportunity
);

// Route to delete a CareerOpportunity by ID
router.delete(
  "/:careerOpportunityId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  CareerOpportunityControllers.deleteCareerOpportunity
);

export const CareerOpportunityRoutes = router;
