import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurDealControllers } from "./ourDeal.controller";
import { OurDealValidation } from "./ourDeal.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new OurDeal
router.post(
  "/create-our-deal",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(OurDealValidation.createOurDealValidationSchema),
  OurDealControllers.createOurDeal
);

// Route to get all OurDeal
router.get("/", OurDealControllers.getAllOurDeal);

// Route to get a single OurDeal by ID
router.get("/:ourDealId", OurDealControllers.getSingleOurDeal);

// Route to update a OurDeal by ID
router.patch(
  "/:ourDealId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurDealControllers.updateOurDeal
);

// Route to delete a OurDeal by ID
router.delete(
  "/:ourDealId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurDealControllers.deleteOurDeal
);

export const OurDealRoutes = router;
