const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m'
  });
};

// @desc    Inscription
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, city, country, phoneNumber } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà' });
    }

    // Créer un nouveau utilisateur
    const user = await User.create({
      firstName,
      lastName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      city,
      country,
      phoneNumber: phoneNumber || null,
      credits: 2,
    });

    // Générer les tokens
    const accessToken = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie!',
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        credits: user.credits,
        role: user.role,
        isVerified: user.isVerified,
        badge: user.badge,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

// @desc    Connexion
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (user.isSuspended) {
      return res.status(403).json({ message: 'Compte suspendu' });
    }

    const accessToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        credits: user.credits,
        role: user.role,
        isVerified: user.isVerified,
        badge: user.badge,
        avatar: user.avatar,
        reputation: user.reputation
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// @desc    Rafraîchir le token
// @route   POST /api/auth/refresh-token
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token manquant' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Refresh token invalide' });
    }

    const newAccessToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ message: 'Refresh token invalide ou expiré' });
  }
};

// @desc    Déconnexio
// @route   POST /api/auth/logout
const logout = async (req, res) => {
  res.status(200).json({ success: true, message: 'Déconnexion réussie' });
};

// @desc    Vérification d'email
// @route   GET /api/auth/verify-email/:token
const verifyEmail = async (req, res) => {
  res.status(200).json({ message: 'Email vérifié (simulation)' });
};

// @desc    Demande de réinitialisation
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  res.status(200).json({ message: 'Email de réinitialisation envoyé (simulation)' });
};

// @desc    Réinitialiser le mot de passe
// @route   POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  res.status(200).json({ message: 'Mot de passe réinitialisé (simulation)' });
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword
};