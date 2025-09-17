import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Ajouté
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();

// --- CONFIGURATION CORS AJOUTÉE ---
const corsOptions = {
  origin: ['https://findly.onrender.com', 'http://localhost:5173'], // Remplace par l'URL de ton frontend sur Render si besoin
  credentials: true,
};
app.use(cors(corsOptions));
// --- FIN DE L'AJOUT ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});