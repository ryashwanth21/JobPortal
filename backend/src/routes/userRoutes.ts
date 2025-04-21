import { Router } from 'express';
import { getFavoriteJobs, updateFavoriteJobs,getUserById } from '../controllers/userController';

const router = Router();

router.get('/:id/favorites', getFavoriteJobs);   // GET /api/users/:id/favorites
router.put('/favorites', updateFavoriteJobs);    // PUT /api/users/favorites
router.get('/:id', getUserById);
export default router;
