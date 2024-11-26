const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost', // או ה-URL של השרת שלך
  dialect: 'postgres', // סוג בסיס הנתונים
  logging: false, // השבתת לוגים של SQL
});

module.exports = sequelize;
