import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Set up socket connection
const socket = io('http://localhost:5000'); // Adjust the URL if needed

const RoomComponent = () => {
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('player1'); // For simplicity, set static userId
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Listen for player joining the room
    socket.on('playerJoined', (userId) => {
      setPlayers((prevPlayers) => [...prevPlayers, userId]);
    });

    // Listen for game started event
    socket.on('gameStarted', () => {
      setGameStarted(true);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('playerJoined');
      socket.off('gameStarted');
    };
  }, []);

  const joinRoom = () => {
    if (roomId) {
      socket.emit('joinRoom', roomId, userId);
    }
  };

  const startGame = () => {
    socket.emit('startGame', roomId);
  };

  return (
    <div>
      <h1>Room {roomId}</h1>
      <div>
        <label>Room ID: </label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div>
        <h3>Players in the room:</h3>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>

      <div>
        {!gameStarted && (
          <button onClick={startGame}>Start Game</button>
        )}
        {gameStarted && <p>Game has started!</p>}
      </div>
    </div>
  );
};

export default RoomComponent;
