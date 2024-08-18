import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { TestimonialControllers } from "./testimonial.controller";
import { TestimonialValidation } from "./testimonial.validation";

const router = express.Router();

// Route to create a new Testimonial
router.post(
  "/create-testimonial",
  validateRequest(TestimonialValidation.createTestimonialValidationSchema),
  TestimonialControllers.createTestimonial
);

// Route to get all Testimonial
router.get("/", TestimonialControllers.getAllTestimonial);

// Route to get a single Testimonial by ID
router.get("/:testimonialId", TestimonialControllers.getSingleTestimonial);

// Route to update a Testimonial by ID
router.patch("/:testimonialId", TestimonialControllers.updateTestimonial);

// Route to delete a Testimonial by ID
router.delete("/:testimonialId", TestimonialControllers.deleteTestimonial);

export const TestimonialRoutes = router;
