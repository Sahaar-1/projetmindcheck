import Evaluation from '../Models/Evaluation';    
import User from '../Models/User';

export const submitEvaluation = async (req, res) => {
  try {
    const { evaluationId, responses, score } = req.body;
    if (!evaluationId || !responses || !score) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    if (![1, 2].includes(evaluationId)) {
      return res.status(400).json({ message: 'Évaluation non valide.' });
    }

    const newEvaluation = new Evaluation({
      evaluationId: evaluationId,
      responses: responses,
      score: score,
      userId: User.findById(req.user._id),
    });

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
