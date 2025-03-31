import express from 'express';
import { getLastFollowUp, completeTask } from '../controllers/mentalFollowUpController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes protégées (nécessitant une authentification)
router.get('/last', authMiddleware, getLastFollowUp);
router.put('/tasks/:taskId/complete', authMiddleware, completeTask);

export default router; 