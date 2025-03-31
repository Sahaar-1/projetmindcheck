import Journal from '../Models/Journal.js';

// Créer une nouvelle entrée dans le journal
export const createJournalEntry = async (req, res) => {
  try {
    const { emotion, intensity, description, activities, tags } = req.body;
    const userId = req.user.id;

    const newEntry = new Journal({
      userId,
      emotion,
      intensity,
      description,
      activities,
      tags
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Erreur lors de la création de l\'entrée:', error);
    res.status(500).json({ message: "Erreur lors de la création de l'entrée du journal" });
  }
};

// Récupérer toutes les entrées du journal d'un utilisateur
export const getJournalEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await Journal.find({ userId })
      .sort({ date: -1 })
      .limit(10); // Limite aux 10 dernières entrées

    res.json(entries);
  } catch (error) {
    console.error('Erreur lors de la récupération des entrées:', error);
    res.status(500).json({ message: "Erreur lors de la récupération des entrées du journal" });
  }
};

// Récupérer une entrée spécifique
export const getJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    res.json(entry);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entrée:', error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'entrée" });
  }
};

// Mettre à jour une entrée
export const updateJournalEntry = async (req, res) => {
  try {
    const { emotion, intensity, description, activities, tags } = req.body;
    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { emotion, intensity, description, activities, tags },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    res.json(entry);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entrée:', error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'entrée" });
  }
};

// Supprimer une entrée
export const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!entry) {
      return res.status(404).json({ message: "Entrée non trouvée" });
    }

    res.json({ message: "Entrée supprimée avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entrée:', error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'entrée" });
  }
}; 