import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Stocker le token dans un cookie HTTP-Only pour la sécurité
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Utilise des cookies sécurisés en production
    sameSite: 'strict', // Empêche les attaques CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // Durée de vie de 30 jours
  });
};

export default generateToken;