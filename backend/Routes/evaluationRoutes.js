import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  submitEvaluation,
  getLastEvaluation,
  getEvaluationHistory
} from '../controllers/evaluationController.js';

const router = express.Router();

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Créer une nouvelle évaluation
router.post('/', submitEvaluation);

// Récupérer toutes les évaluations de l'utilisateur
router.get('/', getEvaluationHistory);

// Récupérer une évaluation spécifique
router.get('/:id', getLastEvaluation);

export default router;
