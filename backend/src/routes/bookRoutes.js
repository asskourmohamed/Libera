const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Routes publiques
router.get('/', (req, res) => {
  res.json({ message: 'Liste des livres avec filtres' });
});

router.get('/search', (req, res) => {
  res.json({ message: 'Recherche full-text' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Détail du livre ${req.params.id}` });
});

// Routes protégées
router.post('/', protect, (req, res) => {
  res.json({ message: 'Création d\'un livre' });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: `Modification du livre ${req.params.id}` });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Suppression du livre ${req.params.id}` });
});

module.exports = router;