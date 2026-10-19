const User = require('../models/userModel');
const Article = require('../models/articleModel');

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, bio, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: 'Email already in use'
      });
    }

    const user = await User.create({
      name,
      email,
      age,
      role,
      bio,
      phone
    });
    return res.status(201).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid resource identifier (ObjectId expected)'
      });
    }

    return res.status(500).json({ message: err.message });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const dependentArticle = await Article.findOne({ author: req.params.id });

    if (dependentArticle) {
      return res.status(400).json({
        message: 'Impossible to delete an author with published articles'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found for deletion' });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      id: req.params.id
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid resource identifier (ObjectId expected)'
      });
    }

    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser
};
