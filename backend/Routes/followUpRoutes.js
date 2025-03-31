import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import MentalFollowUp from '../Models/MentalFollowUp.js';

const router = express.Router();

// Créer un nouveau suivi mental
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { evaluationId, startDate, endDate, tasks } = req.body;
    const userId = req.userId;

    const followUp = new MentalFollowUp({
      userId,
      evaluationId,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(new Date().setDate(new Date().getDate() + 7)),
      tasks: tasks || []
    });

    await followUp.save();
    res.status(201).json(followUp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtenir tous les suivis mentaux d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const followUps = await MentalFollowUp.find({ userId })
      .sort({ startDate: -1 });
    res.json(followUps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtenir un suivi mental spécifique
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const followUp = await MentalFollowUp.findOne({
      _id: req.params.id,
      userId
    });

    if (!followUp) {
      return res.status(404).json({ message: "Suivi mental non trouvé" });
    }

    res.json(followUp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un suivi mental
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const followUp = await MentalFollowUp.findOneAndUpdate(
      { _id: req.params.id, userId },
      { $set: req.body },
      { new: true }
    );

    if (!followUp) {
      return res.status(404).json({ message: "Suivi mental non trouvé" });
    }

    res.json(followUp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un suivi mental
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const followUp = await MentalFollowUp.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!followUp) {
      return res.status(404).json({ message: "Suivi mental non trouvé" });
    }

    res.json({ message: "Suivi mental supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour l'état d'une tâche
router.patch('/:id/tasks/:taskId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { completed } = req.body;

    const followUp = await MentalFollowUp.findOne({
      _id: req.params.id,
      userId
    });

    if (!followUp) {
      return res.status(404).json({ message: "Suivi mental non trouvé" });
    }

    const task = followUp.tasks.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    task.completed = completed;
    await followUp.save();

    res.json(followUp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 