import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
await connectDB(); // 👈 Utilise await pour être sûr que MongoDB se connecte avant de démarrer le serveur

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
