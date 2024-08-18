import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurWorkControllers } from "./ourWork.controller";
import { OurWorkValidation } from "./ourWork.validation";

const router = express.Router();

// Route to create a new OurWork
router.post(
  "/create-our-work",
  validateRequest(OurWorkValidation.createOurWorkValidationSchema),
  OurWorkControllers.createOurWork
);

// Route to get all OurWork
router.get("/", OurWorkControllers.getAllOurWork);

// Route to get a single OurWork by ID
router.get("/:ourWorkId", OurWorkControllers.getSingleOurWork);

// Route to update a OurWork by ID
router.patch("/:ourWorkId", OurWorkControllers.updateOurWork);

// Route to delete a OurWork by ID
router.delete("/:ourWorkId", OurWorkControllers.deleteOurWork);

export const OurWorkRoutes = router;
