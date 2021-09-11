import { Router } from 'express';
import * as controller from '../controllers/songs';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, controller.searchSongs);

export default router;
