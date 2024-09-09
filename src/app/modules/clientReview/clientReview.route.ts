import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ClientReviewController } from "./clientReview.controller";
import { ClientReviewValidation } from "./clientReview.validation";

const router = express.Router();

// Route to create a new client review
router.post(
  "/",
  validateRequest(ClientReviewValidation.createClientReviewValidationSchema),
  ClientReviewController.createClientReview
);

// Route to get all client review
router.get("/", ClientReviewController.getAllClientReview);

// Route to get a single client review  by ID
router.get("/:id", ClientReviewController.getSingleClientReview);

// Route to update a client review  by ID
router.patch(
  "/:id",
  validateRequest(ClientReviewValidation.updateClientReviewValidationSchema),
  ClientReviewController.updateClientReview
);

// Route to delete a client review  by ID
router.delete("/:id", ClientReviewController.deleteClientReview);

export const ClientReviewRoutes = router;
