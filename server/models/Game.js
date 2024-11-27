'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    state: {
      type: DataTypes.JSON, // JSON to store current game state
      allowNull: true,
    },
    currentTurn: {
      type: DataTypes.UUID, // Player whose turn it is
      allowNull: true,
    },
    winnerId: {
      type: DataTypes.UUID, // Winning player's ID
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('waiting', 'in-progress', 'completed'),
      defaultValue: 'waiting',
    },
  }, {
    tableName: 'games',
    timestamps: true,
  });

  Game.associate = function(models) {
    Game.belongsTo(models.Room, { foreignKey: 'roomId' });
    Game.hasMany(models.Player, { foreignKey: 'gameId' });
  };

  return Game;
};
