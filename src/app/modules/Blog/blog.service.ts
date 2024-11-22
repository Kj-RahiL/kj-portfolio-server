import AppError from "../../errors/appError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const createBlogIntoDB = async (payload: TBlog) => {
  // Create a new blog
  const blog = await Blog.create(payload);
  return blog;
};

const getAllBlogFromDb = async () => {
  const result = await Blog.find();
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(404, "Sorry! This Blog is Not found");
  }
  return blog;
};

const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(404, "Sorry! This Blog is Not found");
  }
  const result = await Blog.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  });
  return result;
};
const deleteBlogIntoDB = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(404, "Sorry! This Blog is Not found");
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDb,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
};
