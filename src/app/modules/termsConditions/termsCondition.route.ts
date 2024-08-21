import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { TermsConditionValidation } from "./termsCondition.validation";
import { TermsConditionControllers } from "./termsCondition.controller";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-terms-condition",
  validateRequest(
    TermsConditionValidation.createTermsConditionValidationSchema
  ),
  TermsConditionControllers.createTermsCondition
);

// Route to get all trustUs
router.get("/", TermsConditionControllers.getAllTermsCondition);

// Route to get a single trustUs by ID
router.get(
  "/:termsConditionId",
  TermsConditionControllers.getSingleTermsCondition
);

// Route to update a trustUs by ID
router.patch(
  "/:termsConditionId",
  TermsConditionControllers.updateTermsCondition
);

// Route to delete a trustUs by ID
router.delete(
  "/:termsConditionId",
  TermsConditionControllers.deleteTermsCondition
);

export const TermsConditionRoutes = router;
