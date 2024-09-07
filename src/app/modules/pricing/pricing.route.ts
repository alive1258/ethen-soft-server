import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PricingController } from "./pricing.controller";
import { PricingValidation } from "./pricing.validation";

const router = express.Router();

// Route to create a new pricing
router.post(
  "/pricing",
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
  validateRequest(PricingValidation.updatePricingValidationSchema),
  PricingController.updatePricing
);

// Route to delete a pricing  by ID
router.delete("/:id", PricingController.deletePricing);

export const PricingRoutes = router;
