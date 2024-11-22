import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    gitClientUrl: { type: String, required: true },
    gitServerUrl: { type: String, required: true },
    previewUrl: { type: String, required: true },
    FrontendTech: { type: String, required: true },
    BackendTech: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<TBlog>("Project", blogSchema);
