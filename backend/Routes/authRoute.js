import express from 'express';
import { register, login } from '../controllers/authController.js'; // Importation des fonctions du controller
import authMiddleware from '../Middleware/authMiddleware.js'; // Importation du middleware pour l'authentification
import User from '../Models/User.js'; // Importation du modèle utilisateur

const router = express.Router();

// Route pour l'enregistrement
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);
router.get('/user', authMiddleware, (req, res) => {
    res.json({ userId: req.userId, message: 'Utilisateur authentifié' });
  });
  
// Route pour récupérer les informations de l'utilisateur (protégée par middleware d'authentification)
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclure le mot de passe
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router; // Exportation par défaut
