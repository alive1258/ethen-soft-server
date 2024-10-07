import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { JoinUsValidation } from "./joinUs.validation";
import { JoinUsControllers } from "./joinUs.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new trustUsId
router.post(
  "/create-join-us",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(JoinUsValidation.createJoinUsValidationSchema),
  JoinUsControllers.createJoinUs
);

// Route to get all trustUs
router.get("/", JoinUsControllers.getAllJoinUs);

// Route to get a single trustUs by ID
router.get("/:joinUsId", JoinUsControllers.getSingleJoinUs);

// Route to update a trustUs by ID
router.patch(
  "/:joinUsId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  JoinUsControllers.updateJoinUs
);

// Route to delete a trustUs by ID
router.delete(
  "/:joinUsId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  JoinUsControllers.deleteJoinUs
);

export const JoinUsRoutes = router;
