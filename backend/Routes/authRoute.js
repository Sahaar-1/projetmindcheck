import express from 'express';
import { register, login, logout, getUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes d'authentification
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

// Route pour récupérer les informations de l'utilisateur (protégée par middleware d'authentification)
router.get('/user', authMiddleware, getUserProfile);

export default router; // Exportation par défaut
