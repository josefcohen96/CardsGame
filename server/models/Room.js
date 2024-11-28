'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4, // Example default max players
    },
    players: {
      type: DataTypes.ARRAY(DataTypes.UUID), // Array of player IDs
      defaultValue: [],
    },
    isStarted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

