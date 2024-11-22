import { model, Schema } from "mongoose";
import { TProject } from "./project.interface";

const projectSchema = new Schema<TProject>(
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

export const Project = model<TProject>("Project", projectSchema);
