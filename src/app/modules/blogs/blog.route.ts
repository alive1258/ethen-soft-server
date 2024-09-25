import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BlogValidation } from "./blog.validation";
import { BlogControllers } from "./blog.controller";
import auth from "../../middleware/auth";
import { ENUM_ROLE } from "../../../enums/user";

const router = express.Router();

// Route to create a new Blog
router.post(
  "/create-blog",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog
);

// Route to get all Blog
router.get("/", BlogControllers.getAllBlog);

// Route to get a single Blog by ID
router.get("/:blogId", BlogControllers.getSingleBlog);

// Route to update a Blog by ID
router.patch(
  "/:blogId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  BlogControllers.updateBlog
);

// Route to delete a Blog by ID
router.delete(
  "/:blogId",
  auth(ENUM_ROLE.SUPER_ADMIN, ENUM_ROLE.ADMIN),
  BlogControllers.deleteBlog
);

export const BlogRoutes = router;
