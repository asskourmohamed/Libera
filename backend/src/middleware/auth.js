const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Non authentifié - Token manquant' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -refreshToken');

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.isSuspended) {
      return res.status(403).json({ message: 'Compte suspendu' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur auth:', error);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès réservé aux administrateurs' });
  }
};

module.exports = { protect, adminOnly };