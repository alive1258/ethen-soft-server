import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurProductControllers } from "./ourProduct.controller";
import { OurProductValidation } from "./ourProduct.validation";

const router = express.Router();

// Route to create a new OurProduct
router.post(
  "/create-our-product",
  validateRequest(OurProductValidation.createOurProductValidationSchema),
  OurProductControllers.createOurProduct
);

// Route to get all OurProduct
router.get("/", OurProductControllers.getAllOurProduct);

// Route to get a single OurProduct by ID
router.get("/:ourProductId", OurProductControllers.getSingleOurProduct);

// Route to update a OurProduct by ID
router.patch("/:ourProductId", OurProductControllers.updateOurProduct);

// Route to delete a OurProduct by ID
router.delete("/:ourProductId", OurProductControllers.deleteOurProduct);

export const OurProductRoutes = router;
