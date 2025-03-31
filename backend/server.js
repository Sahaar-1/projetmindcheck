import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoute.js";
import journalRoutes from "./Routes/journalRoutes.js";
import evaluationRoutes from "./Routes/evaluationRoutes.js";
import followUpRoutes from './Routes/followUpRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use('/api/follow-up', followUpRoutes);

// Route de test
app.get('/test', (req, res) => {
  res.json({ message: 'Le serveur fonctionne correctement' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Une erreur est survenue",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connexion à MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("L'URI MongoDB n'est pas définie dans les variables d'environnement");
    }
    
    await mongoose.connect(uri);
    console.log('Connecté à MongoDB avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Route d'accueil (pour vérifier si l'API fonctionne)
app.get("/", (req, res) => {
  res.send("API en cours d'exécution...");
});

// Démarrer le serveur sur le port configuré ou 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
