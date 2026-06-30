const app = require('./src/app');
const connectDB = require('./src/config/database');
require('dotenv').config();

// Connexion à la base de données
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  📚 LIBERA - API SERVER`);
  console.log(`========================================`);
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Environnement: ${process.env.NODE_ENV}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`🩺 Health: http://localhost:${PORT}/health`);
  console.log(`========================================`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  server.close(() => process.exit(1));
});