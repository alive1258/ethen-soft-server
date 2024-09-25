import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ServiceFAQController } from "./serviceFAQ.controller";
import { ServiceFAQValidation } from "./serviceFAQ.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

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
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(ServiceFAQValidation.updateServiceFAQValidationSchema),
  ServiceFAQController.updateServiceFAQ
);

// Route to delete a service FAQ by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ServiceFAQController.deleteServiceFAQ
);

export const ServiceFAQRoutes = router;
