import express from 'express';
const router = express.Router();

// La fonction de traitement de soumission d'évaluation
const submitEvaluation = async (req, res) => {
  try {
    // Extraire les données de la requête
    const { evaluationId, responses, score } = req.body;

    // Traiter l'évaluation (par exemple, enregistrer dans la base de données)
    console.log('Évaluation soumise:', evaluationId, responses, score);

    // Envoyer une réponse de succès
    res.status(200).json({ message: 'Évaluation soumise avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'évaluation', error: err });
  }
};

// Définir la route POST pour soumettre l'évaluation
router.post('/submit', submitEvaluation);

export default router;
