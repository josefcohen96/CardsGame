const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

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
    type: DataTypes.JSON, // ניתן לאחסן תוצאות המשחק בפורמט JSON
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'games',
});

module.exports = Game;
