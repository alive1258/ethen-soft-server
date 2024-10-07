import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { ContactUsController } from "./contactUs.controller";
import { ContactUsValidation } from "./contactUs.validation";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new contactUs
router.post(
  "/",
  validateRequest(ContactUsValidation.createContactUsSchema),
  ContactUsController.createContactUs
);

// Route to get all contactUs
router.get(
  "/",

  ContactUsController.getAllContactUs
);

// Route to get a single contactUs by ID
router.get("/:id", ContactUsController.getSingleContactUs);

// Route to update a contactUs by ID
router.patch(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  validateRequest(ContactUsValidation.updateContactUsSchema),
  ContactUsController.updateContactUs
);

// Route to delete a contactUs by ID
router.delete(
  "/:id",
  auth(ENUM_ROLE.ADMIN, ENUM_ROLE.SUPER_ADMIN),
  ContactUsController.deleteContactUs
);

export const ContactUsRoutes = router;
