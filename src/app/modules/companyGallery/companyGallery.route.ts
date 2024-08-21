import express from "express";
import { CompanyGalleryValidation } from "./companyGallery.validation";
import { CompanyGalleryControllers } from "./companyGallery.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

// Route to create a new companyGallery
router.post(
  "/create-company-gallery",
  validateRequest(
    CompanyGalleryValidation.createCompanyGalleryValidationSchema
  ),
  CompanyGalleryControllers.createCompanyGallery
);

// Route to get all technologies
router.get("/", CompanyGalleryControllers.getAllCompanyGallery);

// Route to get a single companyGallery by ID
router.get(
  "/:companyGalleryId",
  CompanyGalleryControllers.getSingleCompanyGallery
);

// Route to update a companyGallery by ID
router.patch(
  "/:companyGalleryId",
  validateRequest(
    CompanyGalleryValidation.updateCompanyGalleryValidationSchema
  ),
  CompanyGalleryControllers.updateCompanyGallery
);

// Route to delete a companyGallery by ID
router.delete(
  "/:companyGalleryId",
  CompanyGalleryControllers.deleteCompanyGallery
);

export const CompanyGalleryRoutes = router;
