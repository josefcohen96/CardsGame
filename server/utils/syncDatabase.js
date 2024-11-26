const sequelize = require('../config/dbConfig');
const User = require('../models/User');
const Room = require('../models/Room');
const Game = require('../models/Game');
const Friend = require('../models/Friend');

(async () => {
  try {
    console.log('Starting database synchronization...');
    await sequelize.sync({ force: true }); // שים לב: force: true מוחק ומבצע יצירה מחדש
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  } finally {
    await sequelize.close(); // סגור את החיבור אחרי הסנכרון
    console.log('Database connection closed.');
  }
})();
