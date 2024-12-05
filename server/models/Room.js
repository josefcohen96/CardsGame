'use strict';

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
      allowNull: false,
    },
    gameType: {
      type: DataTypes.ENUM('Poker', 'Shithead', 'Durak'),
      allowNull: false,
    },
  }, { timestamps: true });

  Room.associate = function(models) {
    Room.belongsTo(models.User, { foreignKey: 'hostId' });
    Room.hasMany(models.Game, { foreignKey: 'roomId' });
  };

  return Room;
};
