import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FaqValidation } from "./faq.validation";
import { FaqControllers } from "./faq.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new Faq
router.post(
  "/create-faq",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(FaqValidation.createFaqValidationSchema),
  FaqControllers.createFaq
);

// Route to get all Faq
router.get("/", FaqControllers.getAllFaq);

// Route to get a single Faq by ID
router.get("/:faqId", FaqControllers.getSingleFaq);

// Route to update a Faq by ID
router.patch(
  "/:faqId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  FaqControllers.updateFaq
);

// Route to delete a Faq by ID
router.delete(
  "/:faqId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  FaqControllers.deleteFaq
);

export const FaqRoutes = router;
