'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cards: {
      type: DataTypes.JSON, // Stores player's cards
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isHost: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'players',
    timestamps: true,
  });

  Player.associate = function(models) {
    Player.belongsTo(models.Game, { foreignKey: 'gameId' });
    Player.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Player;
};
