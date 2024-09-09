import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ServiceImageValidation } from "./serviceImage.validation";
import { ServiceImageController } from "./serviceImage.controller";

const router = express.Router();

// Route to create a new service image
router.post(
  "/",
  validateRequest(ServiceImageValidation.createServiceImageSchema),
  ServiceImageController.createServiceImage
);

// Route to get all service image
router.get("/", ServiceImageController.getAllServiceImage);

// Route to get a single service image by ID
router.get("/:id", ServiceImageController.getSingleServiceImage);

// Route to update a service image by ID
router.patch(
  "/:id",
  validateRequest(ServiceImageValidation.updateServiceImageSchema),
  ServiceImageController.updateServiceImage
);

// Route to delete a service image by ID
router.delete("/:id", ServiceImageController.deleteServiceImage);

export const ServiceImageRoutes = router;
