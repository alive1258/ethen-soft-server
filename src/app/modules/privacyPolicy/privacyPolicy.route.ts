import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { PrivacyPolicyValidation } from "./privacyPolicy.validation";
import { PrivacyPolicyControllers } from "./privacyPolicy.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-privacy-policy",
  auth(ENUM_ROLE.SUPER_ADMIN),
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
router.patch(
  "/:privacyPolicyId",
  auth(ENUM_ROLE.SUPER_ADMIN),
  PrivacyPolicyControllers.updatePrivacyPolicy
);

// Route to delete a trustUs by ID
router.delete(
  "/:privacyPolicyId",
  auth(ENUM_ROLE.SUPER_ADMIN),
  PrivacyPolicyControllers.deletePrivacyPolicy
);

export const PrivacyPolicyRoutes = router;
