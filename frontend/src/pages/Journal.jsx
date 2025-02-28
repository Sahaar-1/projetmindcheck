import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrashAlt, FaSmile, FaSadTear, FaAngry, FaMeh, FaCalendarAlt, FaTags, FaSearch, FaSave } from 'react-icons/fa';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import "./Journal.css";
const STORAGE_KEY = 'journal_entries_v1';
const DRAFT_KEY = 'journal_draft_v1';

const moods = [
  { name: 'Happy', icon: <FaSmile />, color: '#f1c40f' },
  { name: 'Sad', icon: <FaSadTear />, color: '#3498db' },
  { name: 'Angry', icon: <FaAngry />, color: '#e74c3c' },
  { name: 'Neutral', icon: <FaMeh />, color: '#8e44ad' }
];

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [currentEntry, setCurrentEntry] = useState(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    return savedDraft ? JSON.parse(savedDraft) : {
      text: '',
      emotion: '',
      mood: 'Neutral',
      tags: [],
      date: new Date().toISOString()
    };
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isEntryAdded, setIsEntryAdded] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(currentEntry));
  }, [currentEntry]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentEntry.text || currentEntry.emotion || currentEntry.tags.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentEntry]);

  const updateCurrentEntry = (updates) => {
    setCurrentEntry(prev => ({
      ...prev,
      ...updates
    }));
  };

  const addEntry = () => {
    if (!currentEntry.text.trim()) return;

    const newEntry = {
      id: Date.now(),
      ...currentEntry,
      createdAt: new Date().toISOString()
    };

    setEntries(prev => [newEntry, ...prev]);
    
    setCurrentEntry({
      text: '',
      emotion: '',
      mood: 'Neutral',
      tags: [],
      date: new Date().toISOString()
    });

    setIsEntryAdded(true);
    setTimeout(() => setIsEntryAdded(false), 2000);
  };

  const deleteEntry = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !currentEntry.tags.includes(newTag.trim())) {
      updateCurrentEntry({
        tags: [...currentEntry.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    updateCurrentEntry({
      tags: currentEntry.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const filteredEntries = entries
    .filter(entry => filter === 'All' || entry.mood === filter)
    .filter(entry => 
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="journal-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="journal-header"
      >
        <h1>Mon Journal Personnel</h1>
        <p className="journal-subtitle">Exprimez vos pensées et suivez votre bien-être émotionnel</p>
      </motion.div>

      <AnimatePresence>
        {isEntryAdded && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="success-message"
          >
            Entrée ajoutée avec succès !
          </motion.div>
        )}
      </AnimatePresence>

      <div className="journal-content">
        <motion.div className="entry-form">
          <div className="form-header">
            <div className="date-picker">
              <FaCalendarAlt />
              <input
                type="date"
                value={format(new Date(currentEntry.date), 'yyyy-MM-dd')}
                onChange={(e) => updateCurrentEntry({ date: new Date(e.target.value).toISOString() })}
              />
            </div>
          </div>

          <textarea
            value={currentEntry.text}
            onChange={(e) => updateCurrentEntry({ text: e.target.value })}
            placeholder="Qu'avez-vous en tête aujourd'hui ?"
            className="entry-textarea"
          />

          <div className="mood-selector">
            <p>Comment vous sentez-vous ?</p>
            <div className="mood-icons">
              {moods.map(({ name, icon, color }) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mood-icon ${currentEntry.mood === name ? 'selected' : ''}`}
                  style={{ color: currentEntry.mood === name ? color : undefined }}
                  onClick={() => updateCurrentEntry({ mood: name })}
                >
                  {icon}
                  <span>{name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="tags-section">
            <div className="tags-input">
              <FaTags />
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag..."
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <button onClick={addTag} className="add-tag-btn">+</button>
            </div>
            <div className="tags-list">
              {currentEntry.tags.map(tag => (
                <motion.span
                  key={tag}
                  className="tag"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                  <button onClick={() => removeTag(tag)}>&times;</button>
                </motion.span>
              ))}
            </div>
          </div>

          <textarea
            value={currentEntry.emotion}
            onChange={(e) => updateCurrentEntry({ emotion: e.target.value })}
            placeholder="Décrivez vos émotions plus en détail..."
            className="emotion-textarea"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="save-button"
            onClick={addEntry}
            disabled={!currentEntry.text.trim()}
          >
            <FaSave /> Sauvegarder l'entrée
          </motion.button>
        </motion.div>

        <div className="entries-section">
          <div className="entries-header">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher dans les entrées..."
              />
            </div>
            <div className="mood-filters">
              <button
                className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                onClick={() => setFilter('All')}
              >
                Tout
              </button>
              {moods.map(({ name, icon }) => (
                <button
                  key={name}
                  className={`filter-btn ${filter === name ? 'active' : ''}`}
                  onClick={() => setFilter(name)}
                >
                  {icon} {name}
                </button>
              ))}
            </div>
          </div>

          <motion.div className="entries-list">
            <AnimatePresence>
              {filteredEntries.map(entry => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="entry-card"
                  style={{ borderLeft: `4px solid ${moods.find(m => m.name === entry.mood)?.color}` }}
                >
                  <div className="entry-header">
                    <span className="entry-date">
                      {format(new Date(entry.date), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                  <p className="entry-text">{entry.text}</p>
                  {entry.emotion && (
                    <p className="entry-emotion">{entry.emotion}</p>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="entry-tags">
                      {entry.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="entry-mood">
                    {moods.find(m => m.name === entry.mood)?.icon}
                    <span>{entry.mood}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Journal;