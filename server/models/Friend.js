'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    tableName: 'friends',
    timestamps: true,
  });

  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { foreignKey: 'userId' });
    Friend.belongsTo(models.User, { foreignKey: 'friendId' });
  };

  return Friend;
};
