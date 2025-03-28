import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getComments, createComment, deleteComment } from "../controllers/comments";

const router = Router();

router.use(authMiddleware);

router.get("/:taskId", getComments);
router.post("/:taskId", createComment);
router.delete("/:id", deleteComment);

export default router;
