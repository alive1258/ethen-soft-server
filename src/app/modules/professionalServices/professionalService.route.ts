import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProfessionalServiceValidation } from "./professionalService.validation";
import { ProfessionalServiceControllers } from "./professionalService.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new ProfessionalService
router.post(
  "/create-professional-service",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(
    ProfessionalServiceValidation.createProfessionalServiceValidationSchema
  ),
  ProfessionalServiceControllers.createProfessionalService
);

// Route to get all ProfessionalService
router.get("/", ProfessionalServiceControllers.getAllProfessionalService);

// Route to get a single ProfessionalService by ID
router.get(
  "/:professionalServiceId",
  ProfessionalServiceControllers.getSingleProfessionalService
);

// Route to update a ProfessionalService by ID
router.patch(
  "/:professionalServiceId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ProfessionalServiceControllers.updateProfessionalService
);

// Route to delete a ProfessionalService by ID
router.delete(
  "/:professionalServiceId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  ProfessionalServiceControllers.deleteProfessionalService
);

export const ProfessionalServiceRoutes = router;
