import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getAnalytics } from '../controllers/analytics';

const router = Router();

router.use(authMiddleware as any);

router.get('/', getAnalytics);

export default router;