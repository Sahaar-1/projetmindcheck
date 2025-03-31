import MentalFollowUp from '../Models/MentalFollowUp.js';

// Récupérer le dernier suivi mental d'un utilisateur
export const getLastFollowUp = async (req, res) => {
  try {
    const userId = req.user._id;
    const lastFollowUp = await MentalFollowUp.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!lastFollowUp) {
      return res.status(404).json({
        message: "Aucun suivi mental trouvé",
      });
    }

    res.json({
      followUp: lastFollowUp,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du suivi mental:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération du suivi mental",
      error: error.message,
    });
  }
};

// Marquer une tâche comme terminée
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user._id;

    const followUp = await MentalFollowUp.findOne({ userId });
    if (!followUp) {
      return res.status(404).json({
        message: "Suivi mental non trouvé",
      });
    }

    const task = followUp.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Tâche non trouvée",
      });
    }

    task.completed = true;
    await followUp.save();

    res.json({
      message: "Tâche marquée comme terminée",
      followUp,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la tâche",
      error: error.message,
    });
  }
}; 