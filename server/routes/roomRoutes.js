const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

// Route to get all rooms
router.post('/create', roomController.createRoom);

// Route for joining an existing room
router.post('/join', roomController.joinRoom);

// Route for listing available rooms
router.get('/list', roomController.listRooms);

// Route for getting room details
router.get('/:roomId', roomController.getRoomDetails);

// Route for leaving a room
router.post('/leave', roomController.leaveRoom);

// Route for starting the game in a room
router.post('/start', roomController.startGame);

module.exports = router;