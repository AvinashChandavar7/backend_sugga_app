import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, { message: "Successfully" }),);
});

const getAllTasks = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, { message: "Successfully" }),);
});

const getTaskById = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, { message: "Successfully" }),);
});

const updateTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, { message: "Successfully" }),);
});

const deleteTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, { message: "Successfully" }),);
});


export {
  getTaskById,
  getAllTasks,

  createTask,
  updateTask,
  deleteTask
}