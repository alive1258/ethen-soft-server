import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { RefundPolicyValidation } from "./refundPolicy.validation";
import { RefundPolicyControllers } from "./refundPolicy.controller";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-refund-policy",
  validateRequest(RefundPolicyValidation.createRefundPolicyValidationSchema),
  RefundPolicyControllers.createRefundPolicy
);

// Route to get all trustUs
router.get("/", RefundPolicyControllers.getAllRefundPolicy);

// Route to get a single trustUs by ID
router.get("/:refundPolicyId", RefundPolicyControllers.getSingleRefundPolicy);

// Route to update a trustUs by ID
router.patch("/:refundPolicyId", RefundPolicyControllers.updateRefundPolicy);

// Route to delete a trustUs by ID
router.delete("/:refundPolicyId", RefundPolicyControllers.deleteRefundPolicy);

export const RefundPolicyRoutes = router;
