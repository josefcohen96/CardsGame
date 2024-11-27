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
  }, {
    tableName: 'rooms',
    timestamps: true,
  });

  // Associations
  Room.associate = function(models) {
    // Define any associations here if applicable
    // Example:
    // Room.hasMany(models.Game, { foreignKey: 'roomId' });
    Room.belongsTo(models.User, { foreignKey: 'id' });
  };

  return Room;
};
