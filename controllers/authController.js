import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone, // Ligne ajoutée
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(401).send('Email ou mot de passe invalide');
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{9,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).send('Le mot de passe ne respecte pas les critères de sécurité.');
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send('Un utilisateur avec cet email existe déjà');
    return;
  }

  const user = await User.create({ name, email, password, phone, role });

  if (user.email === process.env.SUPER_ADMIN_EMAIL) {
    user.isAdmin = true;
    await user.save();
  }

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone, // Ligne ajoutée
      isAdmin: user.isAdmin,
      role: user.role,
    });
  } else {
    res.status(400).send('Données utilisateur invalides');
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Déconnexion réussie' });
};

export { authUser, registerUser, logoutUser };