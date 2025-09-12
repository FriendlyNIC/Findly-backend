import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Ajouté
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Ajouté

dotenv.config();
connectDB();

const app = express();

// Middlewares pour lire le JSON et les cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

// Route de base
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes); // Ajouté

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});