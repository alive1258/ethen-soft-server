import { TBlog } from "./blog.interface";
import { Blog } from "./blog.module";

// Service to create a new Blog in the database
const createBlogIntoDB = async (BlogData: TBlog) => {
  const result = await Blog.create(BlogData);

  return result;
};

// Service to retrieve all Blog from the database
const getAllBlogFromDB = async () => {
  const result = await Blog.find();
  return result;
};

// Service to retrieve a single Blog from the database by ID
const getSingleBlogFromDB = async (_id: string) => {
  const result = await Blog.findOne({ _id });
  return result;
};

// Service to update a Blog in the database by ID
const updateBlogInDB = async (_id: string, updateData: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!result) {
    throw new Error("Blog Data not found");
  }

  return result;
};

// Service to delete a Blog from the database by ID
const deleteBlogFromDB = async (_id: string) => {
  const result = await Blog.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("Blog Data not found");
  }

  return result;
};

// Export the Blog services as an object for use in other parts of the application
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
