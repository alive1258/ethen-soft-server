import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PricingFeatureController } from "./pricingFeature.controller";
import { PricingFeatureValidation } from "./pricingFeature.validation";

const router = express.Router();

// Route to create a new pricing feature
router.post(
  "/",
  validateRequest(
    PricingFeatureValidation.createPricingFeatureValidationSchema
  ),
  PricingFeatureController.createPricingFeature
);

// Route to get all pricing feature
router.get("/", PricingFeatureController.getAllPricingFeature);

// Route to get a single pricing feature by ID
router.get("/:id", PricingFeatureController.getSinglePricingFeature);

// Route to update a pricing feature by ID
router.patch(
  "/:id",
  validateRequest(
    PricingFeatureValidation.updatePricingFeatureValidationSchema
  ),
  PricingFeatureController.updatePricingFeature
);

// Route to delete a pricing feature by ID
router.delete("/:id", PricingFeatureController.deletePricingFeature);

export const PricingFeatureRoutes = router;
