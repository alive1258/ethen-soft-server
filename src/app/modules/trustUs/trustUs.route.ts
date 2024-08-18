import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { TrustUsValidation } from "./trustUs.validation";
import { TrustUsControllers } from "./trustUs.controller";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-trust-us",
  validateRequest(TrustUsValidation.createTrustUsValidationSchema),
  TrustUsControllers.createTrustUs
);

// Route to get all trustUs
router.get("/", TrustUsControllers.getAllTrustUs);

// Route to get a single trustUs by ID
router.get("/:trustUsId", TrustUsControllers.getSingleTrustUs);

// Route to update a trustUs by ID
router.patch("/:trustUsId", TrustUsControllers.updateTrustUs);

// Route to delete a trustUs by ID
router.delete("/:trustUsId", TrustUsControllers.deleteTrustUs);

export const TrustUsRoutes = router;
