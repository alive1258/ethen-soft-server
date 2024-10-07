import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BannerControllers } from "./banner.controller";
import { BannerValidation } from "./banner.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new technology
router.post(
  "/create-banner",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(BannerValidation.createBannerValidationSchema),
  BannerControllers.createBanner
);

// Route to get all technologies
router.get("/", BannerControllers.getAllBanner);

// Route to get a single technology by ID
router.get("/:bannerId", BannerControllers.getSingleBanner);

// Route to update a technology by ID
router.patch(
  "/:bannerId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(BannerValidation.updateBannerValidationSchema),
  BannerControllers.updateBanner
);

// Route to delete a technology by ID
router.delete(
  "/:bannerId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  BannerControllers.deleteBanner
);

export const BannerRoutes = router;
