const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Route protégée - Profil utilisateur
router.get('/me', protect, (req, res) => {
  res.json({ 
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      credits: req.user.credits,
      role: req.user.role,
      isVerified: req.user.isVerified,
      badge: req.user.badge,
      avatar: req.user.avatar,
      reputation: req.user.reputation
    }
  });
});

// Route publique - Profil public
router.get('/:username', (req, res) => {
  res.json({ message: `Profil public de ${req.params.username}` });
});

module.exports = router;