const { Friend } = require('../models');
const { User } = require('../models');

const { Op } = require('sequelize');


// Create a friendship between two users
const createFriendship = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!userId || !friendId) {
      return res.status(400).json({ error: 'Both userId and friendId are required.' });
    }

    // Check if the friendship already exists in either direction
    const existingFriendship = await Friend.findOne({
      where: {
        [Op.or]: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ],
      },
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'Friendship already exists.' });
    }

    // Create the friendship
    const newFriendship = await Friend.create({ userId, friendId });
    res.status(201).json(newFriendship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating friendship.' });
  }
};

// Get all friends of a user
const getFriendsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const friends = await Friend.findAll({
      where: {
        [Op.or]: [{ userId }, { friendId: userId }],
      },
      include: [
        { model: User, as: 'User' },       // Include the user who created the friendship
        { model: User, as: 'FriendUser' }, // Include the friend
      ],
    });

    res.status(200).json(friends);
  } catch (error) {
    console.error('Error in getFriendsByUserId:', error);
    res.status(500).json({ error: 'Error retrieving friends.' });
  }
};


// Delete a friendship (remove a friend)
const deleteFriendship = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    
    const friendship1 = await Friend.findOne({ where: { userId1, userId2 } });
    const friendship2 = await Friend.findOne({ where: { userId1: userId2, userId2: userId1 } });

    if (!friendship1 || !friendship2) {
      return res.status(404).json({ error: 'Friendship not found' });
    }

    await friendship1.destroy();
    await friendship2.destroy();

    res.status(200).json({ message: 'Friendship deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting friendship' });
  }
};

module.exports = {
  createFriendship,
  getFriendsByUserId,
  deleteFriendship
};

