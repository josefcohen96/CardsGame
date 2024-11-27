'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    achievements: {
      type: DataTypes.JSON, // Store a list of achievements in JSON format
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  // Associations
  User.associate = function(models) {
    // Define any associations here if applicable
    // Example:
    // User.hasMany(models.Room, { foreignKey: 'hostId' });
    User.hasMany(models.Friend, { foreignKey: 'userId' });
    // User.hasMany(models.Game, { foreignKey: 'playerId' });
  };

  return User;
};
