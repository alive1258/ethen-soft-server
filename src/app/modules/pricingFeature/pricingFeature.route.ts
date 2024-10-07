import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PricingFeatureController } from "./pricingFeature.controller";
import { PricingFeatureValidation } from "./pricingFeature.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new pricing feature
router.post(
  "/",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
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
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    PricingFeatureValidation.updatePricingFeatureValidationSchema
  ),
  PricingFeatureController.updatePricingFeature
);

// Route to delete a pricing feature by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  PricingFeatureController.deletePricingFeature
);

export const PricingFeatureRoutes = router;
