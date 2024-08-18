import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";

// Controller to handle Blog creationF
const createBlog = catchAsync(async (req, res) => {
  const blogData = req.body;

  const result = await BlogServices.createBlogIntoDB(blogData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

// Controller to handle retrieving all heroes
const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

// Controller to handle retrieving a single Blog by ID
const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(blogId);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Blog data not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Blog retrieved successfully",
    data: result,
  });
});

// Controller to handle updating a Blog by ID
const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const updateData = req.body;
  const result = await BlogServices.updateBlogInDB(blogId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

// Controller to handle deleting a BlogId by ID
const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await BlogServices.deleteBlogFromDB(blogId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: "",
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
