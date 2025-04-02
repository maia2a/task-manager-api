import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getComments, createComment, deleteComment } from "../controllers/comments";

const router = Router();

router.use(authMiddleware as any);

router.get("/:taskId", getComments);
router.post("/:taskId", createComment);
router.delete("/:id", deleteComment);

export default router;
