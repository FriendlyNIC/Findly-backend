import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Lien vers le prestataire
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, default: 'XOF' },
      type: { type: String, enum: ['Par heure', 'Forfait'], required: true },
    },
    images: [
      {
        type: String, // Tableau d'URLs d'images Cloudinary
      },
    ],
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;