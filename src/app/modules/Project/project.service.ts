import AppError from "../../errors/appError";
import { TProject } from "./project.interface";
import { Project } from "./project.model";


const createProjectIntoDB = async (payload: TProject) => {

  // Create a new project
  const project = await Project.create(payload);
  return project;
};

const getAllProjectFromDb = async () => {
const result = await Project.find()
return result 
};

const getSingleProjectFromDB = async (id:string) => {
  const project = await Project.findById(id)
  if(!project){
    throw new AppError(404, "Sorry! This Project is Not found")
  }
  return project 
};

const updateProjectIntoDB = async (
  id: string,
  payload: TProject
) => {
  const project = await Project.findById(id)
  if(!project){
    throw new AppError(404, "Sorry! This Project is Not found")
  }
  const result = await Project.findByIdAndUpdate(id, [{ $set: payload }], {
    new: true,
  })
  return result
};
const deleteProjectIntoDB = async (id: string) => {

  const project = await Project.findById(id)
  if(!project){
    throw new AppError(404, "Sorry! This Project is Not found")
  }
  const result = await Project.findByIdAndDelete(id)
  return result
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectFromDb,
  getSingleProjectFromDB,
  updateProjectIntoDB,
  deleteProjectIntoDB,
};
