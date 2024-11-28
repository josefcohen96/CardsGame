const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

// Route to get all players
router.get('/', playerController.getAllPlayers);

// Route to create a new player
router.post('/', playerController.createPlayer);

// Route to get a player by ID
router.get('/:id', playerController.getPlayerById);

// Route to update a player by ID
router.put('/:id', playerController.updatePlayer);

// Route to delete a player by ID
router.delete('/:id', playerController.deletePlayer);

// Route to get players by gameId
router.get('/game/:gameId', playerController.getPlayersByGameId);

module.exports = router;
