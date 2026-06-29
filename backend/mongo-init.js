// Script d'initialisation MongoDB pour Libera
// Ce script s'exécute au premier démarrage du conteneur

// Créer la base de données libera
db = db.getSiblingDB('libera');

// Créer un utilisateur pour l'application
db.createUser({
  user: 'libera_user',
  pwd: 'libera_password_123',
  roles: [
    {
      role: 'readWrite',
      db: 'libera'
    }
  ]
});

// Créer les collections
db.createCollection('users');
db.createCollection('books');
db.createCollection('exchanges');
db.createCollection('messages');

// Créer des index pour de meilleures performances
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.books.createIndex({ title: 'text', author: 'text', tags: 'text' });
db.books.createIndex({ category: 1, status: 1 });
db.books.createIndex({ owner: 1, status: 1 });

print('✅ Base de données Libera initialisée avec succès !');