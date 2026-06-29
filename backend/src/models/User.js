const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String, default: null },
  bio: { type: String, maxlength: 300, default: '' },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, default: null },
  credits: { type: Number, default: 2, min: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  reputation: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 }
  },
  badge: { type: String, enum: ['new', 'bronze', 'silver', 'gold'], default: 'new' },
  stats: {
    booksListed: { type: Number, default: 0 },
    exchangesDone: { type: Number, default: 0 },
    exchangesPending: { type: Number, default: 0 }
  },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  refreshToken: { type: String }
}, { timestamps: true });

// Hash password avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculer le badge en fonction du nombre d'échanges
userSchema.methods.updateBadge = function() {
  const exchanges = this.stats.exchangesDone;
  if (exchanges >= 25) this.badge = 'gold';
  else if (exchanges >= 10) this.badge = 'silver';
  else if (exchanges >= 3) this.badge = 'bronze';
  else this.badge = 'new';
  return this;
};

module.exports = mongoose.model('User', userSchema);