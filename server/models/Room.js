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
    gameType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('waiting', 'active', 'completed'),
      defaultValue: 'waiting',
    },
  }, {
    tableName: 'rooms',
    timestamps: true,
  });

  Room.associate = function(models) {
    Room.belongsTo(models.User, { foreignKey: 'hostId' });
    Room.hasOne(models.Game, { foreignKey: 'roomId' });
  };

  return Room;
};
