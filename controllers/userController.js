import User from '../models/userModel.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      roleLastChanged: user.roleLastChanged,
    });
  } else {
    res.status(404).send('User not found');
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404).send('User not found');
  }
};

// @desc    Switch user role
// @route   PUT /api/users/switch-role
// @access  Private
const switchUserRole = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.roleLastChanged) {
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
      if (user.roleLastChanged > fifteenDaysAgo) {
        res.status(400).send("Vous ne pouvez changer de rôle qu'une fois tous les 15 jours.");
        return;
      }
    }

    user.role = user.role === 'Particulier' ? 'Prestataire' : 'Particulier';
    user.roleLastChanged = new Date();
    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).send('User not found');
  }
};

export { getUserProfile, updateUserProfile, switchUserRole };