import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FeatureAssignedPricingController } from "./FeatureAssignedPricing.controller";
import { FeatureAssignedPricingValidation } from "./FeatureAssignedPricing.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new feature assigned to pricing
router.post(
  "/",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    FeatureAssignedPricingValidation.createFeatureAssignedPricingValidationSchema
  ),
  FeatureAssignedPricingController.createFeatureAssignedPricing
);

// Route to get all feature assigned to pricing
router.get("/", FeatureAssignedPricingController.getAllFeatureAssignedPricing);

// Route to get a single feature assigned to pricing by ID
router.get(
  "/:id",
  FeatureAssignedPricingController.getSingleFeatureAssignedPricing
);

// Route to update a feature assigned to pricing by ID
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    FeatureAssignedPricingValidation.updateFeatureAssignedPricingValidationSchema
  ),
  FeatureAssignedPricingController.updateFeatureAssignedPricing
);

// Route to delete a feature assigned to pricing by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  FeatureAssignedPricingController.deleteFeatureAssignedPricing
);

export const FeatureAssignedPricingRoutes = router;
