import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ServiceValidation } from "./service.validation";
import { ServiceControllers } from "./service.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new service
router.post(
  "/",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(ServiceValidation.createServiceSchema),
  ServiceControllers.createService
);

// Route to get all service
router.get("/", ServiceControllers.getAllService);

// Route to get a single service by ID
router.get("/:id", ServiceControllers.getSingleService);

// Route to update a service by ID
router.patch(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateServiceSchema),
  ServiceControllers.updateService
);

// Route to delete a service by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ServiceControllers.deleteService
);

export const ServiceRoutes = router;
