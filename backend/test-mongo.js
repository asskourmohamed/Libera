const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('========================================');
  console.log('  🔍 TEST DE CONNEXION - LIBERA');
  console.log('========================================\n');
  
  console.log('🔌 Tentative de connexion à MongoDB (Docker)...');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connexion réussie !');
    console.log(`📊 Base de données: ${mongoose.connection.db.databaseName}`);
    
    // Créer un utilisateur de test
    const User = require('./src/models/User');
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@libera.com',
      password: 'Test1234!',
      city: 'Paris',
      country: 'France'
    });
    
    await testUser.save();
    console.log('👤 Utilisateur de test créé avec succès !');
    
    const users = await User.find();
    console.log(`📚 Total utilisateurs: ${users.length}`);
    
    await mongoose.disconnect();
    console.log('👋 Déconnecté');
    console.log('\n✅ Test terminé avec succès !');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n💡 Suggestions:');
    console.log('  1. Vérifiez que Docker est en cours d\'exécution');
    console.log('  2. Lancez : docker-compose up -d');
    console.log('  3. Vérifiez : docker-compose ps');
  }
}

testConnection();