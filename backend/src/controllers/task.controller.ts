import Task from "../models/task.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const getAllTasks = asyncHandler(async (req, res) => {

  const tasks = await Task.find()
    .select("-__v -createdAt -updatedAt");

  return res.status(200)
    .json(new ApiResponse(200, { results: tasks.length, tasks }, "Tasks fetched successfully"));
});


const getTaskById = asyncHandler(async (req, res) => {

  const { taskId } = req.params;

  const task = await Task.findById(taskId)
    .select("-__v -createdAt -updatedAt");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});


const createTask = asyncHandler(async (req, res) => {

  const { title, description, status } = req.body;

  const task = await Task.create({ title, description, status });

  return res.status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const updateTask = asyncHandler(async (req, res) => {

  const { taskId } = req.params;
  const { title, description, status } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, status },
    { new: true }
  );

  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {

  const { taskId } = req.params;

  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});

export {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
