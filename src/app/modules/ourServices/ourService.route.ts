import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurServiceControllers } from "./ourService.controller";
import { OurServiceValidation } from "./ourService.validation";

const router = express.Router();

// Route to create a new OurService
router.post(
  "/create-our-service",
  validateRequest(OurServiceValidation.createOurServiceValidationSchema),
  OurServiceControllers.createOurService
);

// Route to get all OurService
router.get("/", OurServiceControllers.getAllOurService);

// Route to get a single OurService by ID
router.get("/:ourServiceId", OurServiceControllers.getSingleOurService);

// Route to update a OurService by ID
router.patch("/:ourServiceId", OurServiceControllers.updateOurService);

// Route to delete a OurService by ID
router.delete("/:ourServiceId", OurServiceControllers.deleteOurService);

export const OurServiceRoutes = router;
