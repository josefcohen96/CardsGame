require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Routes
// const topicRoutes = require('./routes/topicRoutes');
// const exerciseRoutes = require('./routes/exerciseRoutes');
// const authRoutes = require('./routes/authRoutes');

// app.use('/api/topics', topicRoutes);
// app.use('/api/exercises', exerciseRoutes);
// app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
