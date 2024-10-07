import express from "express";
import validateRequest from "../../middleware/validateRequest";

import { OurServiceControllers } from "./ourService.controller";
import { OurServiceValidation } from "./ourService.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new OurService
router.post(
  "/create-our-service",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(OurServiceValidation.createOurServiceValidationSchema),
  OurServiceControllers.createOurService
);

// Route to get all OurService
router.get("/", OurServiceControllers.getAllOurService);

// Route to get a single OurService by ID
router.get("/:ourServiceId", OurServiceControllers.getSingleOurService);

// Route to update a OurService by ID
router.patch(
  "/:ourServiceId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurServiceControllers.updateOurService
);

// Route to delete a OurService by ID
router.delete(
  "/:ourServiceId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  OurServiceControllers.deleteOurService
);

export const OurServiceRoutes = router;
