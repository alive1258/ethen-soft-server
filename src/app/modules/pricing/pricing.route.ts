import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PricingController } from "./pricing.controller";
import { PricingValidation } from "./pricing.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new pricing
router.post(
  "/",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(PricingValidation.createPricingValidationSchema),
  PricingController.createPricing
);

// Route to get all pricing
router.get("/", PricingController.getAllPricing);

// Route to get a single pricing  by ID
router.get("/:id", PricingController.getSinglePricing);

// Route to update a pricing  by ID
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(PricingValidation.updatePricingValidationSchema),
  PricingController.updatePricing
);

// Route to delete a pricing  by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  PricingController.deletePricing
);

export const PricingRoutes = router;
