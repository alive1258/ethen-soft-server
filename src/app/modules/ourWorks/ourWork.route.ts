import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurWorkControllers } from "./ourWork.controller";
import { OurWorkValidation } from "./ourWork.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new OurWork
router.post(
  "/create-our-work",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(OurWorkValidation.createOurWorkValidationSchema),
  OurWorkControllers.createOurWork
);

// Route to get all OurWork
router.get("/", OurWorkControllers.getAllOurWork);

// Route to get a single OurWork by ID
router.get("/:ourWorkId", OurWorkControllers.getSingleOurWork);

// Route to update a OurWork by ID
router.patch(
  "/:ourWorkId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurWorkControllers.updateOurWork
);

// Route to delete a OurWork by ID
router.delete(
  "/:ourWorkId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurWorkControllers.deleteOurWork
);

export const OurWorkRoutes = router;
