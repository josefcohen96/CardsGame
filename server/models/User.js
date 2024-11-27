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
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = function(models) {
    User.hasMany(models.Room, { foreignKey: 'hostId' });
    User.hasMany(models.Player, { foreignKey: 'userId' });
    User.hasMany(models.Friend, { foreignKey: 'userId' });
  };

  return User;
};
