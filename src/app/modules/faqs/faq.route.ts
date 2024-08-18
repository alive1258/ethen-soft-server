import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FaqValidation } from "./faq.validation";
import { FaqControllers } from "./faq.controller";

const router = express.Router();

// Route to create a new Faq
router.post(
  "/create-faq",
  validateRequest(FaqValidation.createFaqValidationSchema),
  FaqControllers.createFaq
);

// Route to get all Faq
router.get("/", FaqControllers.getAllFaq);

// Route to get a single Faq by ID
router.get("/:faqId", FaqControllers.getSingleFaq);

// Route to update a Faq by ID
router.patch("/:faqId", FaqControllers.updateFaq);

// Route to delete a Faq by ID
router.delete("/:faqId", FaqControllers.deleteFaq);

export const FaqRoutes = router;
