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

  // Associations
  Friend.associate = function(models) {
    // Define any associations here if applicable
    // Example:
    // Friend.belongsTo(models.User, { foreignKey: 'userId' });
    // Friend.belongsTo(models.User, { foreignKey: 'friendId' });
  };

  return Friend;
};
