import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '../controllers/journalController.js';

const router = express.Router();

// Toutes les routes sont protégées par l'authentification
router.use(authMiddleware);

// Routes pour le journal
router.post('/', createJournalEntry);
router.get('/', getJournalEntries);
router.get('/:id', getJournalEntry);
router.put('/:id', updateJournalEntry);
router.delete('/:id', deleteJournalEntry);

export default router; 