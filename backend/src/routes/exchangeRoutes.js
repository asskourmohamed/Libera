const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Routes protégées
router.get('/my', protect, (req, res) => {
  res.json({ message: 'Mes échanges' });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: `Détail de l'échange ${req.params.id}` });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Création d\'une demande d\'échange' });
});

router.put('/:id/accept', protect, (req, res) => {
  res.json({ message: `Acceptation de l'échange ${req.params.id}` });
});

router.put('/:id/reject', protect, (req, res) => {
  res.json({ message: `Refus de l'échange ${req.params.id}` });
});

router.put('/:id/confirm', protect, (req, res) => {
  res.json({ message: `Confirmation de l'échange ${req.params.id}` });
});

module.exports = router;