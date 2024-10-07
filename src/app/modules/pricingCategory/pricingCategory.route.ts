import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PricingCategoryValidation } from "./pricingCategory.validation";
import { PricingCategoryController } from "./pricingCategory.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new pricing category
router.post(
  "/",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    PricingCategoryValidation.createPricingCategoryValidationSchema
  ),
  PricingCategoryController.createPricingCategory
);

// Route to get all pricing category
router.get("/", PricingCategoryController.getAllPricingCategory);

// Route to get a single pricing category by ID
router.get("/:id", PricingCategoryController.getSinglePricingCategory);

// Route to update a pricing category by ID
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    PricingCategoryValidation.updatePricingCategoryValidationSchema
  ),
  PricingCategoryController.updatePricingCategory
);

// Route to delete a pricing category by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  PricingCategoryController.deletePricingCategory
);

export const PricingCategoryRoutes = router;
