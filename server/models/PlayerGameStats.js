'use strict';

module.exports = (sequelize, DataTypes) => {
  const PlayerGameStats = sequelize.define('PlayerGameStats', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    playerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    moves: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, { timestamps: true });

  PlayerGameStats.associate = function(models) {
    PlayerGameStats.belongsTo(models.Game, { foreignKey: 'gameId' });
    PlayerGameStats.belongsTo(models.User, { foreignKey: 'playerId' });
  };

  return PlayerGameStats;
};
