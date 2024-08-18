import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurClientControllers } from "./ourClient.controller";
import { OurClientValidation } from "./ourClient.validation";

const router = express.Router();

// Route to create a new OurClient
router.post(
  "/create-our-client",
  validateRequest(OurClientValidation.createOurClientValidationSchema),
  OurClientControllers.createOurClient
);

// Route to get all OurClient
router.get("/", OurClientControllers.getAllOurClient);

// Route to get a single OurClient by ID
router.get("/:ourClientId", OurClientControllers.getSingleOurClient);

// Route to update a OurClient by ID
router.patch("/:ourClientId", OurClientControllers.updateOurClient);

// Route to delete a OurClient by ID
router.delete("/:ourClientId", OurClientControllers.deleteOurClient);

export const OurClientRoutes = router;
