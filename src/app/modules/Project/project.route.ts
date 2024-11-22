import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectValidations } from "./project.validation";
import { projectControllers } from "./project.controller";

const router = express.Router();

router.post(
  "/create-project",
  validateRequest(ProjectValidations.projectValidationSchema),
  projectControllers.createProject
);

//get Id by  project
router.get("/:id", projectControllers.getSingleProject );


//update project
router.put(
  "/:id",
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  projectControllers.updateProject
);
//delete project
router.delete("/:id", projectControllers.deleteProject);

//get all project
router.get("/", projectControllers.getAllProject);

export const ProjectRoutes = router;
