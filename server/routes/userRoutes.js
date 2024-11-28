const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers);  // Path: GET /users

// Create a new user
router.post('/', userController.createUser);  // Path: POST /users

// Get user by ID
router.get('/:id', userController.getUserById);  // Path: GET /users/:id

// Update user information
router.put('/:id', userController.updateUser);  // Path: PUT /users/:id

// Delete a user
router.delete('/:id', userController.deleteUser);  // Path: DELETE /users/:id

// Get user by username
router.get('/username/:username', userController.getUserByUsername);  // Path: GET /users/username/:username

// Login user (simple validation of username/password)
router.post('/login', userController.loginUser);  // Path: POST /users/login

// Get user stats (e.g., wins, losses)
router.get('/:id/stats', userController.getUserStats);  // Path: GET /users/:id/stats



module.exports = router;
