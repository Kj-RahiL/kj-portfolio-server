
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProject = catchAsync(async (req, res) => {

  const result = await ProjectServices.getAllProjectFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const {id}= req.params

  const result = await ProjectServices.getSingleProjectFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProjectIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProjectIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project Deleted successfully!",
    data: result,
  });
});

export const projectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
