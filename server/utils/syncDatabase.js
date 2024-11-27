const { sequelize } = require('../models'); // Import sequelize instance from models/index.js

(async () => {
  try {
    console.log('Starting database synchronization...');
    await sequelize.sync({ force: true }); // Synchronize all models with the database
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  } finally {
    if (sequelize && sequelize.close) {
      await sequelize.close(); // Close the connection
      console.log('Database connection closed.');
    } else {
      console.error('Failed to close the database connection. Check the sequelize instance.');
    }
  }
})();
