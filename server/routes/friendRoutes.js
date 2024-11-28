const express = require('express');
const friendController = require('../controllers/friendController');

const router = express.Router();

// Route to create a friendship between two users
router.post('/', friendController.createFriendship);

// Route to get all friends of a user
router.get('/:userId', friendController.getFriendsByUserId);

// Route to delete a friendship (remove a friend)
router.delete('/', friendController.deleteFriendship);

module.exports = router;
