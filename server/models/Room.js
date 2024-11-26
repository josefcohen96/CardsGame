const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

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
  timestamps: true,
  tableName: 'rooms',
});

module.exports = Room;
