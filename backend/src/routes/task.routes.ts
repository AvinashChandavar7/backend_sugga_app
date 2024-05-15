import { Router } from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller";

const router = Router();

router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);


router.post("/", createTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);


export default router;
