import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('--- ERREUR DE CONNEXION À MONGODB ---');
    console.error(error.message || error);
    console.error('------------------------------------');
    process.exit(1);
  }
};

export default connectDB;
