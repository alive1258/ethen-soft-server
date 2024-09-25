import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurProductControllers } from "./ourProduct.controller";
import { OurProductValidation } from "./ourProduct.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new OurProduct
router.post(
  "/create-our-product",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(OurProductValidation.createOurProductValidationSchema),
  OurProductControllers.createOurProduct
);

// Route to get all OurProduct
router.get("/", OurProductControllers.getAllOurProduct);

// Route to get a single OurProduct by ID
router.get("/:ourProductId", OurProductControllers.getSingleOurProduct);

// Route to update a OurProduct by ID
router.patch(
  "/:ourProductId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurProductControllers.updateOurProduct
);

// Route to delete a OurProduct by ID
router.delete(
  "/:ourProductId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurProductControllers.deleteOurProduct
);

export const OurProductRoutes = router;
