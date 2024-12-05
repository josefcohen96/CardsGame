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
      type: DataTypes.JSON,
      allowNull: true,
    },
    stats: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, { timestamps: true });

  User.associate = function(models) {
    User.hasMany(models.Room, { foreignKey: 'hostId' });
    User.hasMany(models.PlayerGameStats, { foreignKey: 'playerId' });
    User.hasMany(models.Friend, { foreignKey: 'userId', as: 'Friends' }); // Friends initiated by this user
    User.hasMany(models.Friend, { foreignKey: 'friendId', as: 'FriendOf' }); // Friends where this user is the recipient
  };

  return User;
};
