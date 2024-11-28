const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

// Route to create a new game
router.post('/', gameController.createGame);

// Route to get all games
router.get('/', gameController.getAllGames);

// Route to get a game by ID
router.get('/:id', gameController.getGameById);

// Route to update a game by ID
router.put('/:id', gameController.updateGame);

// Route to delete a game by ID
router.delete('/:id', gameController.deleteGame);

// Route to get games by creatorUserId
router.get('/creator/:creatorUserId', gameController.getGamesByCreator);

module.exports = router;
