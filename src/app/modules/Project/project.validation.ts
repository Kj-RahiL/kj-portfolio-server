import { z } from "zod";
const projectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    images: z
      .array(z.string())
      .nonempty({ message: "Images array must contain at least one image." }),
    gitClientUrl: z.string().url({ message: "Invalid URL for Git client." }),
    gitServerUrl: z.string().url({ message: "Invalid URL for Git server." }),
    previewUrl: z.string().url({ message: "Invalid preview URL." }),
    FrontendTech: z
      .string()
      .min(1, { message: "Frontend technology is required." }),
    BackendTech: z
      .string()
      .min(1, { message: "Backend technology is required." }),
  }),
});

const updateProjectValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  gitClientUrl: z.string().optional(),
  gitServerUrl: z.string().optional(),
  previewUrl: z.string().optional(),
  Frontend: z.string().optional(),
  Backend: z.string().optional(),
});

export const ProjectValidations = {
  projectValidationSchema,
  updateProjectValidationSchema,
};
