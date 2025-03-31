import Evaluation from '../models/Evaluation.js';    
import User from '../models/User.js';
import MentalFollowUp from '../models/MentalFollowUp.js';
import { addDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Headers reçus:', req.headers);
    console.log('Authorization header:', authHeader);

    if (!authHeader) {
      console.log('Pas de header Authorization trouvé');
      return null;
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extrait:', token ? 'Token présent' : 'Pas de token');

    if (!token) {
      console.log('Token manquant dans le header');
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token décodé:', decoded);
    return decoded.userId;
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return null;
  }
};

export const submitEvaluation = async (req, res) => {
  try {
    console.log('Tentative de soumission d\'évaluation');
    console.log('Body reçu:', JSON.stringify(req.body, null, 2));

    // Validation des données reçues
    if (!req.body || typeof req.body !== 'object') {
      console.error('Body invalide:', req.body);
      return res.status(400).json({ 
        message: 'Les données de l\'évaluation sont invalides',
        received: req.body
      });
    }

    const { answers, score } = req.body;

    // Validation des réponses
    if (!answers || typeof answers !== 'object') {
      console.error('Réponses invalides:', answers);
      return res.status(400).json({ 
        message: 'Le format des réponses est invalide',
        received: answers
      });
    }

    // Validation du score
    if (typeof score !== 'number' || score < 0 || score > 100) {
      console.error('Score invalide:', score);
      return res.status(400).json({ 
        message: 'Le score doit être un nombre entre 0 et 100',
        received: score
      });
    }

    // Vérification du token et récupération de l'ID utilisateur
    const userId = verifyToken(req);
    if (!userId) {
      console.log('Échec de la vérification du token');
      return res.status(401).json({ message: 'Token invalide ou manquant.' });
    }

    console.log('ID de l\'utilisateur:', userId);

    // Création de la nouvelle évaluation
    const newEvaluation = new Evaluation({
      responses: answers,
      score: score,
      userId: userId,
      date: new Date(),
    });

    // Sauvegarde de l'évaluation
    const savedEvaluation = await newEvaluation.save();
    console.log('Évaluation sauvegardée:', savedEvaluation);

    // Création du suivi mental
    const followUp = new MentalFollowUp({
      userId: userId,
      evaluationId: savedEvaluation._id,
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      tasks: [
        {
          title: "Pratiquer la respiration profonde",
          description: "Faire 5 minutes de respiration profonde",
          completed: false,
          date: addDays(new Date(), 1),
        },
        {
          title: "Faire une activité physique",
          description: "30 minutes d'exercice physique",
          completed: false,
          date: addDays(new Date(), 2),
        },
        {
          title: "Tenir un journal",
          description: "Écrire vos pensées et émotions",
          completed: false,
          date: addDays(new Date(), 3),
        },
        {
          title: "Pratiquer la méditation",
          description: "10 minutes de méditation",
          completed: false,
          date: addDays(new Date(), 4),
        },
        {
          title: "Maintenir une routine de sommeil",
          description: "Aller dormir et se réveiller à la même heure",
          completed: false,
          date: addDays(new Date(), 5),
        },
        {
          title: "Socialiser",
          description: "Passer du temps avec des amis ou la famille",
          completed: false,
          date: addDays(new Date(), 6),
        },
        {
          title: "Faire une activité relaxante",
          description: "Lire un livre ou écouter de la musique",
          completed: false,
          date: addDays(new Date(), 7),
        },
      ],
    });

    // Sauvegarde du suivi mental
    const savedFollowUp = await followUp.save();
    console.log('Suivi mental sauvegardé:', savedFollowUp);

    res.status(201).json({
      message: "Évaluation enregistrée avec succès",
      evaluation: savedEvaluation,
      followUp: savedFollowUp
    });
  } catch (error) {
    console.error("Erreur lors de la soumission de l'évaluation:", error);
    res.status(500).json({
      message: "Erreur lors de la soumission de l'évaluation",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getLastEvaluation = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Recherche de la dernière évaluation pour l\'utilisateur:', userId);

    const lastEvaluation = await Evaluation.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!lastEvaluation) {
      console.log('Aucune évaluation trouvée pour l\'utilisateur:', userId);
      return res.status(404).json({ message: "Aucune évaluation trouvée" });
    }

    console.log('Dernière évaluation trouvée:', lastEvaluation);
    res.json({ evaluation: lastEvaluation });
  } catch (error) {
    console.error('Erreur lors de la récupération de la dernière évaluation:', error);
    res.status(500).json({ message: "Erreur lors de la récupération de la dernière évaluation" });
  }
};

export const getEvaluationHistory = async (req, res) => {
  try {
    console.log('Tentative de récupération de l\'historique des évaluations');
    const userId = verifyToken(req);
    
    if (!userId) {
      console.log('Échec de la vérification du token');
      return res.status(401).json({ message: 'Token invalide ou manquant.' });
    }

    const evaluations = await Evaluation.find({ userId })
      .sort({ date: -1 });

    res.json(evaluations);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique.' });
  }
};
