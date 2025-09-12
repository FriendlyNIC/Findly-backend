import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // On retourne aussi le statut admin
    });
  } else {
    res.status(401).send('Invalid email or password');
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send('User already exists');
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  // --- LOGIQUE SUPERADMIN AJOUTÉE ---
  if (user.email === process.env.SUPER_ADMIN_EMAIL) {
    user.isAdmin = true;
    await user.save();
  }
  // --- FIN DE L'AJOUT ---

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, // On retourne aussi le statut admin
    });
  } else {
    res.status(400).send('Invalid user data');
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export { authUser, registerUser, logoutUser };