import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour l'inscription
export const register = async (req, res) => {
  try {
    console.log("Données reçues:", req.body);
    const { username, email, password, dob } = req.body;

    // Validation des données
    if (!username || !email || !password) {
      console.log("Champs manquants:", { username, email, password });
      return res.status(400).json({ 
        message: "Tous les champs sont obligatoires",
        missingFields: {
          username: !username,
          email: !email,
          password: !password
        }
      });
    }

    if (username.length < 3) {
      return res.status(400).json({ 
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
        currentLength: username.length
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Le mot de passe doit contenir au moins 6 caractères",
        currentLength: password.length
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password,
      ...(dob && { dob: new Date(dob) })
    });

    await user.save();

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dob: user.dob
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    
    // Gestion spécifique des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: "Erreur de validation",
        errors: messages
      });
    }

    // Gestion des erreurs de duplication
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé"
      });
    }

    res.status(500).json({
      message: "Erreur lors de l'inscription",
      error: error.message,
    });
  }
};

// Fonction pour la connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dob: user.dob
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      message: "Erreur lors de la connexion",
      error: error.message,
    });
  }
};

// Fonction pour la déconnexion
export const logout = async (req, res) => {
  try {
    res.json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    res.status(500).json({
      message: "Erreur lors de la déconnexion",
      error: error.message,
    });
  }
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};
