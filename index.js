const express = require('express');
const db = require('./models');

// Import routes
const secretariaRoutes = require('./routes/secretariaRoutes');
const planoAcademicoRoutes = require('./routes/planoAcademicoRoutes');

const app = express();
app.use(express.json());

// API Routes
app.use('/api/secretarias', secretariaRoutes);
app.use('/api/planos-academicos', planoAcademicoRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  db.sequelize.authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

module.exports = app; // Export the app for testing
