const { Player } = require('../models');

// Create a new player
const createPlayer = async (req, res) => {
  try {
    const { gameId, userId } = req.body;
    const newPlayer = await Player.create({ gameId, userId });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating player' });
  }
};

// Get all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving players' });
  }
};

// Get a player by ID
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving player' });
  }
};

// Update a player by ID
const updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const { gameId, userId } = req.body;
    player.gameId = gameId || player.gameId;
    player.userId = userId || player.userId;

    await player.save();
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Error updating player' });
  }
};

// Delete a player by ID
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    await player.destroy();
    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting player' });
  }
};

// Get players by gameId
const getPlayersByGameId = async (req, res) => {
  try {
    const players = await Player.findAll({ where: { gameId: req.params.gameId } });
    if (players.length === 0) {
      return res.status(404).json({ error: 'No players found for this game' });
    }
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving players by game' });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getPlayersByGameId
};
