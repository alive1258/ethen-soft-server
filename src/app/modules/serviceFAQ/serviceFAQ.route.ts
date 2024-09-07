import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ServiceFAQController } from "./serviceFAQ.controller";
import { ServiceFAQValidation } from "./serviceFAQ.validation";

const router = express.Router();

// Route to create a new service FAQ
router.post(
  "/",
  validateRequest(ServiceFAQValidation.createServiceFAQValidationSchema),
  ServiceFAQController.createServiceFAQ
);

// Route to get all service FAQ
router.get("/", ServiceFAQController.getAllServiceFAQ);

// Route to get a single service FAQ by ID
router.get("/:id", ServiceFAQController.getSingleServiceFAQ);

// Route to update a service FAQ by ID
router.patch(
  "/:id",
  validateRequest(ServiceFAQValidation.updateServiceFAQValidationSchema),
  ServiceFAQController.updateServiceFAQ
);

// Route to delete a service FAQ by ID
router.delete("/:id", ServiceFAQController.deleteServiceFAQ);

export const ServiceFAQRoutes = router;
