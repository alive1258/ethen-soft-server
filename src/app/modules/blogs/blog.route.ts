import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

// Route to create a new Blog
router.post(
  "/create-blog",
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog
);

// Route to get all Blog
router.get("/", BlogControllers.getAllBlog);

// Route to get a single Blog by ID
router.get("/:blogId", BlogControllers.getSingleBlog);

// Route to update a Blog by ID
router.patch("/:blogId", BlogControllers.updateBlog);

// Route to delete a Blog by ID
router.delete("/:blogId", BlogControllers.deleteBlog);

export const BlogRoutes = router;
