import e, { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getTasks, createTask, updateTask, deleteTask, getTask } from "../controllers/tasks";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", getTask as any);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;