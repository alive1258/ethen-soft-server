import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PrivacyPolicyValidation } from "./privacyPolicy.validation";
import { PrivacyPolicyControllers } from "./privacyPolicy.controller";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-privacy-policy",
  validateRequest(PrivacyPolicyValidation.createPrivacyPolicyValidationSchema),
  PrivacyPolicyControllers.createPrivacyPolicy
);

// Route to get all trustUs
router.get("/", PrivacyPolicyControllers.getAllPrivacyPolicy);

// Route to get a single trustUs by ID
router.get(
  "/:privacyPolicyId",
  PrivacyPolicyControllers.getSinglePrivacyPolicy
);

// Route to update a trustUs by ID
router.patch("/:privacyPolicyId", PrivacyPolicyControllers.updatePrivacyPolicy);

// Route to delete a trustUs by ID
router.delete(
  "/:privacyPolicyId",
  PrivacyPolicyControllers.deletePrivacyPolicy
);

export const PrivacyPolicyRoutes = router;
