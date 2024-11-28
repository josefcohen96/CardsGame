const { User, Room, Friend, Game, Player } = require('./models'); // Adjust if needed

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.destroy({ where: {} });
    await Room.destroy({ where: {} });
    await Friend.destroy({ where: {} });
    await Game.destroy({ where: {} });
    await Player.destroy({ where: {} });

    // Sample Users
    const user1 = await User.create({ username: 'player1', password: 'password123' });
    const user2 = await User.create({ username: 'player2', password: 'password123' });
    const user3 = await User.create({ username: 'player3', password: 'password123' });

    // Sample Rooms
    const room1 = await Room.create({
      name: 'Room 1',
      hostId: user1.id, // Host is user1
      players: [user1.id, user2.id], // Room 1 players
      gameType: 'Tic Tac Toe',
      maxPlayers: 4,
    });

    const room2 = await Room.create({
      name: 'Room 2',
      hostId: user2.id, // Host is user2
      players: [user2.id, user3.id], // Room 2 players
      gameType: 'Chess',
      maxPlayers: 4,
    });

    // Sample Friends
    await Friend.create({ userId: user1.id, friendId: user2.id });
    await Friend.create({ userId: user2.id, friendId: user3.id });

    // Sample Games (linked to rooms)
    const game1 = await Game.create({ roomId: room1.id });
    const game2 = await Game.create({ roomId: room2.id });

    // Sample Players (for games)
    await Player.create({ gameId: game1.id, userId: user1.id, isHost: true });
    await Player.create({ gameId: game1.id, userId: user2.id, isHost: false });
    await Player.create({ gameId: game2.id, userId: user3.id, isHost: true });

    console.log('Sample data has been successfully seeded!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedDatabase();
