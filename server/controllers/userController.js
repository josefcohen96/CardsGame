const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
};

const getUserByUsername = async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.params.username } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user' });
    }
  };
  
const getUserStats = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { wins, losses } = user;
      res.status(200).json({ wins, losses });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user stats' });
    }
  };
  const changePassword = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const { oldPassword, newPassword } = req.body;
  
      if (user.password !== oldPassword) {
        return res.status(400).json({ error: 'Incorrect old password' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error changing password' });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { username, password } = req.body;
      if (username) user.username = username;
      if (password) user.password = password;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  
  

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserStats,
  updateUser,
  deleteUser,
  loginUser
};
