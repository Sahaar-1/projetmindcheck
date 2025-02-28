import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./Routes/authRoute.js"; // Correct importation des routes d'authentification
import evaluationRoutes from "./Routes/evaluationRoutes.js"; // Correct importation des routes d'évaluation

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

// Routes pour l'authentification
app.use("/api/auth", authRoutes);

app.use("/api/evaluation", evaluationRoutes);  


// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("Erreur de connexion MongoDB:", err));

// Route d'accueil (pour vérifier si l'API fonctionne)
app.get("/", (req, res) => {
  res.send("API en cours d'exécution...");
});

// Démarrer le serveur sur le port configuré ou 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
