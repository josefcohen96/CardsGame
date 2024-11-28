const { Room } = require('../models'); // Adjust the model import if necessary

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { name, maxPlayers } = req.body;

    // Create a new room with the provided data
    const newRoom = await Room.create({
      name,
      maxPlayers,
      players: [],  // Initially, no players in the room
      isStarted: false,  // Room is not started yet
    });

    // Return the newly created room details
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Error creating room.' });
  }
};

// Join a room
const joinRoom = async (req, res) => {
  try {
    const { roomId, playerId } = req.body;

    // Find the room by its ID
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found.' });

    // Check if the room is full
    if (room.players.length >= room.maxPlayers) {
      return res.status(400).json({ error: 'Room is full.' });
    }

    // Add the player to the room's player list
    room.players.push(playerId);
    await room.save();

    // Return the updated room details
    res.status(200).json(room);
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ error: 'Error joining room.' });
  }
};

// List available rooms (rooms not started)
const listRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      where: { isStarted: false },  // Only show rooms that are not started
      attributes: ['id', 'name', 'maxPlayers', 'players'],  // Only return relevant fields
    });

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error retrieving rooms:', error);
    res.status(500).json({ error: 'Error retrieving rooms.' });
  }
};

// Get detailed information about a room
const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found.' });

    res.status(200).json(room);
  } catch (error) {
    console.error('Error retrieving room details:', error);
    res.status(500).json({ error: 'Error retrieving room details.' });
  }
};

// Leave a room
const leaveRoom = async (req, res) => {
  try {
    const { roomId, playerId } = req.body;

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found.' });

    // Remove the player from the room's player list
    room.players = room.players.filter((id) => id !== playerId);
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ error: 'Error leaving room.' });
  }
};

// Start the game in the room
const startGame = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found.' });

    if (room.players.length < 2) {
      return res.status(400).json({ error: 'At least 2 players are required to start the game.' });
    }

    room.isStarted = true;
    await room.save();

    res.status(200).json({ message: 'Game started!', room });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Error starting game.' });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  listRooms,
  getRoomDetails,
  leaveRoom,
  startGame,
};
