import Evaluation from '../models/Evaluation.js'; // Assurez-vous que vous avez un modèle MongoDB pour les évaluations

export const submitEvaluation = async (req, res) => {
  try {
    const { evaluationId, responses, score } = req.body; // Récupérer l'ID d'évaluation, les réponses et le score
    if (!evaluationId || !responses || !score) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Vérifier si l'ID d'évaluation existe dans la base de données (si nécessaire)
    // Vous pouvez adapter cette partie pour valider l'ID dans un tableau d'évaluations spécifiques
    if (![1, 2].includes(evaluationId)) {
      return res.status(400).json({ message: 'Évaluation non valide.' });
    }

    // Créer une nouvelle évaluation (associée à l'ID donné)
    const newEvaluation = new Evaluation({
      evaluationId: evaluationId, // ID d'évaluation
      responses: responses, // Réponses de l'utilisateur
      score: score, // Score de l'évaluation
    });

    // Sauvegarder l'évaluation dans la base de données
    await newEvaluation.save();

    res.status(200).json({
      message: 'Évaluation soumise avec succès!',
      evaluation: newEvaluation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la soumission de l\'évaluation',
      error: error.message,
    });
  }
};
