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
      type: DataTypes.ENUM('waiting', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'waiting',
    },
    result: {
      type: DataTypes.JSON, // Store game results in JSON format
      allowNull: true,
    },
  }, {
    tableName: 'games',
    timestamps: true,
  });

  // Associations
  Game.associate = function(models) {
    // Define any associations here if applicable
    // Example:
    Game.belongsTo(models.Room, { foreignKey: 'id' });
  };

  return Game;
};
