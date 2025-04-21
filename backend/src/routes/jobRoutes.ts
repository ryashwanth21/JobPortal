import { Router } from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyForJob
} from '../controllers/jobController';

const router = Router();

// ❌ DO NOT include `/jobs` here, it's already prefixed in `index.ts`
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.post('/:id/apply', applyForJob);

export default router;
