@echo off
echo ========================================
echo   🚀 LIBERA - DÉMARRAGE DE L'ENVIRONNEMENT
echo ========================================
echo.

echo 📦 Démarrage des conteneurs Docker...
docker-compose up -d

echo.
echo ⏳ Attente de MongoDB...
timeout /t 5 /nobreak > nul

echo.
echo 📊 État des conteneurs :
docker-compose ps

echo.
echo ========================================
echo ✅ Environnement Libera prêt !
echo ========================================
echo 🔗 MongoDB : mongodb://localhost:27017
echo 🔗 Mongo-Express : http://localhost:8081 (admin/admin123)
echo 🔗 Redis : redis://localhost:6379
echo.
echo 📦 Pour arrêter : docker-compose down
echo 📦 Pour voir les logs : docker-compose logs -f
echo ========================================