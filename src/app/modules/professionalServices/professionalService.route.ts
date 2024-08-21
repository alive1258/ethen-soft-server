import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProfessionalServiceValidation } from "./professionalService.validation";
import { ProfessionalServiceControllers } from "./professionalService.controller";

const router = express.Router();

// Route to create a new ProfessionalService
router.post(
  "/create-professional-service",
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
  ProfessionalServiceControllers.updateProfessionalService
);

// Route to delete a ProfessionalService by ID
router.delete(
  "/:professionalServiceId",
  ProfessionalServiceControllers.deleteProfessionalService
);

export const ProfessionalServiceRoutes = router;
