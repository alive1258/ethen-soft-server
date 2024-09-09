import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = express.Router();

// Route to create a new category
router.post(
  "/",
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

// Route to get all category
router.get("/", CategoryController.getAllCategory);

// Route to get a single category  by ID
router.get("/:id", CategoryController.getSingleCategory);

// Route to update a category  by ID
router.patch(
  "/:id",
  validateRequest(CategoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory
);

// Route to delete a category  by ID
router.delete("/:id", CategoryController.deleteCategory);

export const CategoryRoutes = router;
