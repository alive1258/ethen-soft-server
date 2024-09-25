import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { RefundPolicyValidation } from "./refundPolicy.validation";
import { RefundPolicyControllers } from "./refundPolicy.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-refund-policy",
  auth(ENUM_ROLE.SUPER_ADMIN),
  validateRequest(RefundPolicyValidation.createRefundPolicyValidationSchema),
  RefundPolicyControllers.createRefundPolicy
);

// Route to get all trustUs
router.get("/", RefundPolicyControllers.getAllRefundPolicy);

// Route to get a single trustUs by ID
router.get("/:refundPolicyId", RefundPolicyControllers.getSingleRefundPolicy);

// Route to update a trustUs by ID
router.patch(
  "/:refundPolicyId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  RefundPolicyControllers.updateRefundPolicy
);

// Route to delete a trustUs by ID
router.delete(
  "/:refundPolicyId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  RefundPolicyControllers.deleteRefundPolicy
);

export const RefundPolicyRoutes = router;
