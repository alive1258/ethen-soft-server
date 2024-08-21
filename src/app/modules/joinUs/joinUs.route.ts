import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { JoinUsValidation } from "./joinUs.validation";
import { JoinUsControllers } from "./joinUs.controller";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-join-us",
  validateRequest(JoinUsValidation.createJoinUsValidationSchema),
  JoinUsControllers.createJoinUs
);

// Route to get all trustUs
router.get("/", JoinUsControllers.getAllJoinUs);

// Route to get a single trustUs by ID
router.get("/:joinUsId", JoinUsControllers.getSingleJoinUs);

// Route to update a trustUs by ID
router.patch("/:joinUsId", JoinUsControllers.updateJoinUs);

// Route to delete a trustUs by ID
router.delete("/:joinUsId", JoinUsControllers.deleteJoinUs);

export const JoinUsRoutes = router;
