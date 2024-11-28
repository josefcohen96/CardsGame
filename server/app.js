// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { sequelize } = require('./models');

// const app = express();

// const userRoutes = require('./routes/userRoutes'); 
// const playerRoutes = require('./routes/playerRoutes'); 
// const gameRoutes = require('./routes/gameRoutes'); 
// const friendRoutes = require('./routes/friendRoutes'); 
// const roomRoutes = require('./routes/roomRoutes'); 
 




// // Middleware
// app.use(cors());
// app.use(express.json());


// app.get('/', (req, res) => {
//   res.send('Welcome to the CardsGame API!');
// });

// app.use('/users', userRoutes);
// app.use('/rooms', roomRoutes);
// app.use('/players', playerRoutes);
// app.use('/games', gameRoutes);
// app.use('/friends', friendRoutes);


// // Start server
// const PORT = process.env.PORT || 5000;
// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Importing routes
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');
const friendRoutes = require('./routes/friendRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Create HTTP server and attach socket.io
const server = http.createServer(app);
const io = socketIo(server); // Initialize socket.io on the server

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the CardsGame API!');
});

app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/players', playerRoutes);
app.use('/games', gameRoutes);
app.use('/friends', friendRoutes);

// Socket.IO Event Handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Event for when a player joins a room
  socket.on('joinRoom', (roomId, userId) => {
    console.log(`User ${userId} joined room ${roomId}`);
    socket.join(roomId); // User joins the room

    // Notify other players in the room
    socket.to(roomId).emit('playerJoined', userId);
  });

  // Event for starting the game
  socket.on('startGame', (roomId) => {
    console.log(`Game started in room ${roomId}`);
    io.to(roomId).emit('gameStarted'); // Emit event to start game for all players in the room
  });

  // Event for player action (e.g., playing a card)
  socket.on('playerAction', (roomId, action) => {
    console.log(`Player action in room ${roomId}: ${action}`);
    socket.to(roomId).emit('playerAction', action); // Broadcast action to other players in the room
  });

  // Handle player disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // Optionally, you could remove the player from the room or update the game state if needed
  });
});

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
