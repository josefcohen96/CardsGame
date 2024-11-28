const { Game } = require('../models');

// Create a new game
const createGame = async (req, res) => {
  try {
    const { name, creatorUserId } = req.body;  // Assuming game has a name and a creator user
    const newGame = await Game.create({ name, creatorUserId });
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'Error creating game' });
  }
};

// Get all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving games' });
  }
};

// Get a game by ID
const getGameById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving game' });
  }
};

// Update a game by ID
const updateGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const { name, creatorUserId } = req.body;
    game.name = name || game.name;
    game.creatorUserId = creatorUserId || game.creatorUserId;

    await game.save();
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Error updating game' });
  }
};

// Delete a game by ID
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    await game.destroy();
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting game' });
  }
};

// Get games by creatorUserId (or any other filter)
const getGamesByCreator = async (req, res) => {
  try {
    const games = await Game.findAll({ where: { creatorUserId: req.params.creatorUserId } });
    if (games.length === 0) {
      return res.status(404).json({ error: 'No games found for this user' });
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving games' });
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
  getGamesByCreator
};
